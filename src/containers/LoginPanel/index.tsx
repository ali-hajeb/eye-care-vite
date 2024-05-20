import React, { ReactElement, useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  resetResponse,
  userAuthActions,
} from '../../features/UserAuthentication';
import { useAppDispatch, useAppSelector } from '../../store';
import { useForm } from '@mantine/form';
import { Box, Button, Checkbox, TextInput, Title } from '@mantine/core';

export interface LoginPanelProps {}

const LoginPanel: React.FC<LoginPanelProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
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
  return (
    <Box maw={500} mx="auto" px={5} py={10}>
      <Title order={1} ta={'center'} mb={'1em'}>
        نام نویسی در سایت
      </Title>
      <form onSubmit={formSubmitHandler}>
        <TextInput
          label="ایمیل"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <TextInput
          label="گذرواژه"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Checkbox
          my={'md'}
          label="مرا به یاد داشته باش"
          key={form.key('rememberMe')}
          {...form.getInputProps('rememberMe', {type: 'checkbox'})}
        />
        <Button fullWidth mb={'sm'} type="submit">
          ورود
        </Button>
        <Button fullWidth variant="subtle" onClick={buttonNavigateHandler}>
          نام نویسی در سایت
        </Button>
      </form>
    </Box>
  );
};

export default LoginPanel;
