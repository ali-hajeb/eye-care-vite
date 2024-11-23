import { Alert, Card, Container, Loader, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { IconInfoCircle } from '@tabler/icons-react';

export interface VerifyPageProps {}

const VerifyPage: React.FunctionComponent<VerifyPageProps> = () => {
  const [query] = useSearchParams();

  const [error, setError] = useState({ code: 0, message: '' });

  useEffect(() => {
    let url = '/user';
    if (query.get('isDoc')) url = '/doctor';
    axiosInstance
      .post(`${url}/confirm`, { token: query.get('token') })
      .then((res) => {
        setError({ code: 200, message: 'حساب کاربری با موفقیت تأیید شد!' });
      })
      .catch((err) => {
        console.log(err)
        let message = 'خطایی پیش آمده‌است!';
        if (err.response.data.code === 'NONEXIST') message = 'حساب کاربری یافت نشد!';
        else if (err.response.data.code === 'NOTOKEN') message = 'توکن یافت نشد!';
        setError({ code: 500, message });
      });
  }, [query]);
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
        <Title order={1}>تأیید حساب کاربری</Title>
        {error.message ? (
          <Alert
            mt={'md'}
            variant="light"
            color={error.code > 300 ? 'red' : 'blue'}
            title="هشدار"
            icon={<IconInfoCircle />}
          >
            {error.message}
          </Alert>
        ) : (
          <Loader m={'auto'} my={50} />
        )}
      </Card>
    </Container>
  );
};

export default VerifyPage;
