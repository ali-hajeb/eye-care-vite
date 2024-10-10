import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  TextInput,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextEditor from '../components/TextEditor';
import axiosInstance from '../services/axiosInstance';
import { isAxiosError } from 'axios';
import { IconInfoCircle } from '@tabler/icons-react';
import { IPost } from './blog';

export interface PostPageProps {}

interface IResponse {
  code: number;
  message: string;
}

const PostPage: React.FunctionComponent<PostPageProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loadingState, setLoadingState] = useState(false);
  const [res, setRes] = useState<IResponse>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const formSubmitHandler = (e: React.FormEvent) => {
    e?.preventDefault();
    setLoadingState(true);
    (id
      ? axiosInstance.patch(`/tip/${id}`, { title, body })
      : axiosInstance.post('/tip', { title, body })
    )
      .then(() => {
        setRes({ code: 200, message: 'مطلب با موفقیت منتشر شد.' });
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
          const { title, body } = res.data as IPost;
          setTitle(title);
          setBody(body);
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
              <TextInput
                placeholder="موضوع مطلب را وارد کنید"
                onChange={titleInputChangeHandler}
                value={title}
              />
              <Box>
                <TextEditor content={body} onChange={setBody} />
              </Box>
              <Group>
                <Button disabled={loadingState} type="submit" loading={loadingState}>
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
