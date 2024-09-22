import React from 'react';
import {
  Box,
  Button,
  Group,
  Input,
  InputLabel,
  TextInput,
  Title,
} from '@mantine/core';
import { hasLength, matchesField, useForm } from '@mantine/form';
import { IconChevronDown } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  resetResponse,
  userAuthActions,
} from '../../features/UserAuthentication';
import { IMajor } from '../../features/UserAuthentication/types/user';
import { useNavigate } from 'react-router-dom';

export interface SignupPanelProps {}

const SignupPanel: React.FunctionComponent<SignupPanelProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { response, status } = useAppSelector((state) => state.user);

  const form = useForm({
    mode: 'uncontrolled',
    validate: {
      cpassword: matchesField('password', 'گذرواژه‌ها یکسان نیستند'),
      idCode: hasLength(10, 'کد ملی باید ده رقمی باشد')
    },
    validateInputOnChange: ['cpassword'],
    initialValues: {
      idCode: '',
      password: '',
      cpassword: '',
      firstName: '',
      lastName: '',
      gender: 0,
      nezam: '',
      field: '',
      major: 'عمومی',
    },
  });
  const formSubmitHandler = form.onSubmit(
    (values, e) => {
      e?.preventDefault();
      dispatch(
        userAuthActions.signUp({
          ...values,
          major: values.major as IMajor,
        }),
      );
      console.log(values);
    },
    (error) => {
      console.error(error);
    },
  );

  const buttonNavigateHandler = () => {
    dispatch(resetResponse());
    navigate(-1);
  };
  return (
    <Box maw={500} mx="auto" px={5} py={10}>
      <Title order={1} ta={'center'} mb={'1em'}>
        نام نویسی در سایت
      </Title>
      <form onSubmit={formSubmitHandler}>
        <Group grow>
          <TextInput
            label="نام"
            key={form.key('firstName')}
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label="نام خانوادگی"
            key={form.key('lastName')}
            {...form.getInputProps('lastName')}
          />
        </Group>
        <TextInput
          type="number"
          label="کد ملی"
          key={form.key('idCode')}
          {...form.getInputProps('idCode')}
        />
        <TextInput
          type="password"
          label="گذرواژه"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <TextInput
          type="password"
          label="تأیید گذرواژه"
          key={form.key('cpassword')}
          {...form.getInputProps('cpassword')}
        />
        <Group grow>
          <div>
            <InputLabel htmlFor="gender">جنسیت</InputLabel>
            <Input
              id="gender"
              component="select"
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              key={form.key('gender')}
              {...form.getInputProps('gender')}
              pointer
            >
              <option value="0">مرد</option>
              <option value="1">زن</option>
            </Input>
          </div>
        </Group>
        <Group grow>
          <div>
            <InputLabel htmlFor="major">مدرک</InputLabel>
            <Input
              id="major"
              component="select"
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              key={form.key('major')}
              {...form.getInputProps('major')}
              pointer
            >
              <option value="عمومی">عمومی</option>
              <option value="متخصص">متخصص</option>
              <option value="فوق تخصص">فوق تخصص</option>
            </Input>
          </div>
          <TextInput
            label="رشته"
            key={form.key('field')}
            {...form.getInputProps('field')}
          />
        </Group>

        <TextInput
          label="کد نظام پزشکی"
          key={form.key('nezam')}
          {...form.getInputProps('nezam')}
        />

        <Button
          fullWidth
          mt={'sm'}
          mb={'sm'}
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'در حال پردازش ...' : 'نام نویسی'}
        </Button>
        <Button fullWidth variant="subtle" onClick={buttonNavigateHandler}>
          بازگشت
        </Button>
      </form>
    </Box>
  );
};

export default SignupPanel;
