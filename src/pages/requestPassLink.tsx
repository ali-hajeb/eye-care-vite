import {
  Alert,
  Button,
  Card,
  Container,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { IconInfoCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

export interface VerifyPageProps {}

const RequestPassPage: React.FunctionComponent<VerifyPageProps> = () => {
  const [error, setError] = useState({ code: 0, message: '' });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },
  });

  const formSubmitHandler = form.onSubmit(
    (values, e) => {
      e?.preventDefault();
      setLoading(true);
      axiosInstance
        .post('/doctor/password/verification', { email: values.email })
        .then((res) => {
          setError({ code: 200, message: 'لینک ویرایش گذرواژه ارسال شد!' });
        })
        .catch((err) => {
          console.log(err)
          setError({ code: 500, message: 'مشکلی در اجرای درخواست پیش آمد!' });
        })
        .finally(() => setLoading(false));
      console.log(values);
    },
    (error) => {
      console.error(error);
    },
  );

  return (
    <Container fluid>
      <Card
        radius={'md'}
        shadow="md"
        maw={450}
        m="auto"
        mt={'20vh'}
        px={25}
        py={25}
      >
        <Title order={1}>فراموشی گذرواژه</Title>
        {error.message && (
          <Alert
            mt={'md'}
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
          my={'md'}
            label="ایمیل"
            type="email"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <Button type="submit" fullWidth mb={'sm'} loading={loading}>
            درخواست لینک
          </Button>
          <Button fullWidth variant="subtle" onClick={() => navigate(-1)}>
            بازگشت
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default RequestPassPage;
