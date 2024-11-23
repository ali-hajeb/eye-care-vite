import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  resetResponse,
  userAuthActions,
} from '../../features/UserAuthentication';
import { useAppDispatch, useAppSelector } from '../../store';
import { useForm } from '@mantine/form';
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  TextInput,
  Title,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export interface LoginPanelProps {}

const LoginPanel: React.FC<LoginPanelProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      idCode: '',
      password: '',
      rememberMe: true,
    },
  });

  const formSubmitHandler = form.onSubmit(
    (values, e) => {
      e?.preventDefault();
      dispatch(userAuthActions.login(values));
      console.log(values);
    },
    (error) => {
      console.error(error);
    },
  );

  const { response, status } = useAppSelector((state) => state.user);

  const buttonNavigateHandler = () => {
    dispatch(resetResponse());
    navigate('/signup');
  };
  const buttonForgetNavigateHandler = () => {
    dispatch(resetResponse());
    navigate('/forget');
  };
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
          ورود
        </Title>
        {response?.code && response.code > 300 && (
          <Alert
            variant="light"
            title="هشدار"
            color="red"
            icon={<IconInfoCircle />}
          >
            کد ملی یا گذرواژه نامعتبر است!
          </Alert>
        )}
        <form onSubmit={formSubmitHandler}>
          <TextInput
            label="کد ملی"
            type="number"
            key={form.key('idCode')}
            {...form.getInputProps('idCode')}
          />
          <TextInput
            label="گذرواژه"
            type="password"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Checkbox
            my={'md'}
            label="مرا به یاد داشته باش"
            key={form.key('rememberMe')}
            {...form.getInputProps('rememberMe', { type: 'checkbox' })}
          />
          <Button
            type="submit"
            fullWidth
            mb={'sm'}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'در حال پردازش ...' : 'ورود'}
          </Button>
          <Button fullWidth variant="outline" onClick={buttonNavigateHandler}>
            نام نویسی در سایت
          </Button>
          <Button
            fullWidth
            variant="subtle"
            onClick={buttonForgetNavigateHandler}
          >
            گذرواژه خود را فراموش کردید؟
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default LoginPanel;
