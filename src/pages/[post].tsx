import {
  Alert,
  Box,
  Button,
  Card,
  Combobox,
  Container,
  Flex,
  Group,
  Input,
  InputBase,
  TextInput,
  useCombobox,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextEditor from '../components/TextEditor';
import axiosInstance from '../services/axiosInstance';
import { isAxiosError } from 'axios';
import {
  IconCaretRight,
  IconChevronRight,
  IconInfoCircle,
} from '@tabler/icons-react';
import { IPost } from './blog';

export interface PostPageProps {}

interface IResponse {
  code: number;
  message: string;
}

const COMBO = ['ساختار چشم', 'بیماری چشم', 'آموزشی', 'پیوند قرنیه'];

const PostPage: React.FunctionComponent<PostPageProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [loadingState, setLoadingState] = useState(false);
  const [res, setRes] = useState<IResponse>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [comboValue, setComboValue] = useState<string | null>(null);

  const options = COMBO.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const formSubmitHandler = (e: React.FormEvent) => {
    e?.preventDefault();
    setLoadingState(true);
    (id
      ? axiosInstance.patch(`/tip/${id}`, { title, body, category: comboValue })
      : axiosInstance.post('/tip', { title, body, category: comboValue })
    )
      .then(() => {
        setRes({ code: 200, message: 'مطلب با موفقیت منتشر شد.' });
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          setRes({
            code: err.response?.status || 500,
            message: 'مشکلی در ارسال درخواست پیش آمده‌است!',
          });
        }
      })
      .finally(() => setLoadingState(false));
  };

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/tip/${id}`)
        .then((res) => {
          const { title, body, category } = res.data as IPost;
          setTitle(title);
          setBody(body);
          setComboValue(category);
        })
        .catch((err) => {
          console.error(err);
          navigate(-1);
        })
        .finally(() => setLoadingState(false));
    }
  }, [id]);

  const titleInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const buttonNavigateHandler = () => {
    navigate(-1);
  };
  const delBtnHandler = () => {
    setLoadingState(true);
    axiosInstance
      .delete('/tip/' + id)
      .then(() => {
        setRes({ code: 200, message: 'مطلب با موفقیت حذف شد.' });
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          setRes({
            code: err.response?.status || 500,
            message: err.response?.data,
          });
        }
      })
      .finally(() => setLoadingState(false));
  };
  return (
    <Container fluid>
      <Box>
        <form onSubmit={formSubmitHandler}>
          <Card radius={'md'} shadow="md">
            {res?.code && (
              <Alert
                variant="light"
                color={res.code > 300 ? 'red' : 'lime'}
                title={res.message}
                icon={<IconInfoCircle />}
              />
            )}
            <Flex direction={'column'} gap={'md'}>
              <Flex w={'100%'} gap={'md'} align={'center'}>
                <Box>
                  <Button
                    variant="transparent"
                    color="dark.9"
                    onClick={() => navigate(-1)}
                  >
                    <IconChevronRight size={32} />
                  </Button>
                </Box>
                <Box flex={1}>
                  <TextInput
                    placeholder="موضوع مطلب را وارد کنید"
                    onChange={titleInputChangeHandler}
                    value={title}
                  />
                </Box>
                <Box>
                  <Combobox
                    store={combobox}
                    onOptionSubmit={(val) => {
                      setComboValue(val);
                      combobox.closeDropdown();
                    }}
                  >
                    <Combobox.Target>
                      <InputBase
                        component="button"
                        type="button"
                        pointer
                        rightSection={<Combobox.Chevron />}
                        rightSectionPointerEvents="none"
                        onClick={() => combobox.toggleDropdown()}
                      >
                        {comboValue || (
                          <Input.Placeholder>انتخاب دسته</Input.Placeholder>
                        )}
                      </InputBase>
                    </Combobox.Target>

                    <Combobox.Dropdown>
                      <Combobox.Options>{options}</Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>
                </Box>
              </Flex>
              <Box>
                <TextEditor content={body} onChange={setBody} />
              </Box>
              <Group>
                <Button
                  disabled={loadingState}
                  type="submit"
                  loading={loadingState}
                >
                  {loadingState ? 'پردازش' : 'انتشار'}
                </Button>
                {id && (
                  <Button
                    disabled={loadingState}
                    variant="light"
                    color="red"
                    onClick={delBtnHandler}
                  >
                    {loadingState ? 'پردازش' : 'حذف'}
                  </Button>
                )}
                <Button variant="subtle" onClick={buttonNavigateHandler}>
                  بازگشت
                </Button>
              </Group>
            </Flex>
          </Card>
        </form>
      </Box>
    </Container>
  );
};

export default PostPage;
