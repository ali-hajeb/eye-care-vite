import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { matchesField, useForm } from '@mantine/form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { IconInfoCircle } from '@tabler/icons-react';

export interface ForgetPassPageProps {}

const ForgetPassPage: React.FunctionComponent<ForgetPassPageProps> = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();

  const [error, setError] = useState({ code: 0, message: '' });

  const form = useForm({
    mode: 'uncontrolled',
    validate: {
      newPassword: matchesField('password', 'گذرواژه‌ها یکسان نیستند'),
    },
    validateInputOnChange: ['newPassword'],
    initialValues: {
      password: '',
      newPassword: '',
    },
  });

  useEffect(() => {
    console.log('[params]: ', query.get('isDoc'));
  }, [query]);

  const formSubmitHandler = form.onSubmit(
    (values, e) => {
      e?.preventDefault();
      if (!query.get('token')) {
        setError({ code: 401, message: 'توکن نامعتبر است!' });
        return;
      }
      let url = '/user';
      if (query.get('isDoc')) url = '/doctor';
      axiosInstance
        .post(`${url}/password`, {
          token: query.get('token'),
          newPassword: values.newPassword,
        })
        .then((res) => {
          setError({ code: 200, message: 'گذرواژه با موفقیت ویرایش شد!' });
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 1500);
        })
        .catch((err) => {
          let message = 'خطایی پیش آمده است!';
          if (err.response.data.code === 'NONEXIST')
            message = 'حساب کاربری یافت نشد!';
          else if (err.response.data.code === 'NOTOKEN')
            message = 'توکن یافت نشد!';
          else if (err.response.data.code === 'INVALIDTOKEN')
            message = 'توکن نامعتبر است!';
          else if (err.response.data.code === 'INVALID')
            message = 'اطلاعات وارد شده نامعتبر است: ' + err.fields.join(', ');
          setError({ code: 500, message });
        });
      console.log(values);
    },
    (error) => {
      console.error(error);
    },
  );

  const { response, status } = useAppSelector((state) => state.user);
  return (
    <Container fluid>
      <Card
        radius={'md'}
        shadow="md"
        maw={450}
        m="auto"
        my={'20vh'}
        px={25}
        py={25}
      >
        <Title order={1} ta={'center'} mb={'1em'}>
          فراموشی گذرواژه
        </Title>
        {error.message && (
          <Alert
            variant="light"
            color={error.code > 300 ? 'red' : 'blue'}
            title="هشدار"
            icon={<IconInfoCircle />}
          >
            {error.message}
          </Alert>
        )}
        <form onSubmit={formSubmitHandler}>
          <TextInput
            label="گذرواژه"
            type="password"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <TextInput
            label="تأیید گذرواژه"
            type="password"
            key={form.key('newPassword')}
            {...form.getInputProps('newPassword')}
          />
          <Button
            type="submit"
            fullWidth
            mt={'sm'}
            disabled={status === 'loading'}
            loading={status === 'loading'}
          >
            {status === 'loading' ? 'در حال پردازش ...' : 'ویرایش'}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ForgetPassPage;
