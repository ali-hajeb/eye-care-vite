import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Group,
  Input,
  InputLabel,
  Skeleton,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { IDoctor } from '../common/types';
import { useAppDispatch, useAppSelector } from '../store';
import { hasLength, matchesField, useForm } from '@mantine/form';
import { userAuthActions } from '../features/UserAuthentication';
import {
  IMajor,
  IUserSignUpObject,
} from '../features/UserAuthentication/types/user';
import { IconChevronDown } from '@tabler/icons-react';
import { weekdayNames } from '../common/weekdays';

export interface ProfilePageProps {}

const ProfilePage: React.FunctionComponent<ProfilePageProps> = () => {
  const [profile, setProfile] = useState<IDoctor>();
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [linkLoading, setLinkLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { response, status } = useAppSelector((state) => state.user);

  const form = useForm({
    mode: 'uncontrolled',
    validate: {
      // cpassword: matchesField('password', 'گذرواژه‌ها یکسان نیستند'),
      idCode: hasLength(10, 'کد ملی باید ده رقمی باشد'),
    },
    // validateInputOnChange: ['cpassword'],
    initialValues: {
      idCode: profile?.idCode || '',
      email: profile?.email || '',
      password: '',
      cpassword: '',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      gender: profile?.gender || 0,
      nezam: profile?.nezam || '',
      field: profile?.field || '',
      major: profile?.major || 'عمومی',
      maxPatients: profile?.maxPatients || 20,
    },
  });
  const formSubmitHandler = form.onSubmit(
    (values, e) => {
      e?.preventDefault();
      const wd = weekdays
        .map((d) =>
          weekdayNames.indexOf(d) - 1 === -1 ? 6 : weekdayNames.indexOf(d) - 1,
        )
        .sort((a, b) => a - b);
      console.log(values);
      dispatch(
        userAuthActions.updateUser({
          ...values,
          major: values.major as IMajor,
          gender: values.gender.toString() === '0' ? false : true,
          workDays: wd,
        }),
      );
      console.log(values);
    },
    (error) => {
      console.error(error);
    },
  );

  const sendNewLink = async () => {
    setLinkLoading(true);
    axiosInstance
      .post('/doctor/newLink', {})
      .catch((err) => console.log(err))
      .finally(() => setLinkLoading(false));
  };

  useEffect(() => {
    axiosInstance
      .get('/doctor/me')
      .then((res) => {
        form.initialize(res.data);
        setProfile(res.data);
        const wd = (res.data as IUserSignUpObject).workDays?.map(
          (d) => weekdayNames[d === 6 ? 0 : d + 1],
        );
        setWeekdays(wd || []);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Container fluid>
      <Group align="center" gap={32}>
        <Avatar size={'xl'}></Avatar>
        {profile ? (
          <Title>{`دکتر ${profile.firstName} ${profile.lastName}`}</Title>
        ) : (
          <Skeleton height={35} width={200} radius="md" />
        )}
        {!profile?.isActive && (
          <Button
            my={'md'}
            variant="subtle"
            onClick={sendNewLink}
            loading={linkLoading}
          >
            ارسال مجدد لینک فعالسازی
          </Button>
        )}
      </Group>
      {profile && (
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
            type="email"
            label="ایمیل"
            key={form.key('email')}
            {...form.getInputProps('email')}
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
              label="تخصص"
              key={form.key('field')}
              {...form.getInputProps('field')}
            />
          </Group>

          <Group grow>
            <TextInput
              label="کد نظام پزشکی"
              key={form.key('nezam')}
              {...form.getInputProps('nezam')}
            />
            <TextInput
              label="تعداد پذیرش روزانه"
              type="number"
              key={form.key('maxPatients')}
              {...form.getInputProps('maxPatients')}
            />
          </Group>

          <div>
            <InputLabel>برنامه هفتگی</InputLabel>
            <Checkbox.Group value={weekdays} onChange={setWeekdays}>
              <Group>
                {weekdayNames.map((d) => (
                  <Checkbox key={d} value={d} label={d} />
                ))}
              </Group>
            </Checkbox.Group>
          </div>

          <Button
            fullWidth
            mt={'sm'}
            mb={'sm'}
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'در حال پردازش ...' : 'ویرایش'}
          </Button>
        </form>
      )}
    </Container>
  );
};

export default ProfilePage;
