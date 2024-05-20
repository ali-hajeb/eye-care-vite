import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Fieldset,
  Group,
  Input,
  InputLabel,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronDown } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../store';
import userAuthAction from '../../features/UserAuthentication/store/userAuthAction';

export interface SignupPanelProps {}

const SignupPanel: React.FunctionComponent<SignupPanelProps> = () => {
  const dispatch = useAppDispatch()
  const {response, status} = useAppSelector(state => state.user);
  const [isAlergic, setAlergic] = useState(false);
  const [hasEyeDis, setEyeDis] = useState(false);
  const [drug, setDrug] = useState(false);

  const checkboxHandler =
    (fn: React.Dispatch<React.SetStateAction<boolean>>) => () =>
      fn((prev) => !prev);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      cpassword: '',
      firstName: '',
      lastName: '',
      firstName_en: '',
      lastName_en: '',
      fatherName: '',
      weight: 0,
      isMarried: 0,
      education: 0,
      job: '',
      immediateFamily: '',
      carerFname: '',
      carerLname: '',
      carerAge: 0,
      carerRel: '',
      carerEducation: 0,
      carerGender: 0,
      gender: 0,
      idCode: '',
      isSmoker: false,
      isAlcoholic: false,
      allergy: '',
      hasDiabetes: false,
      hasHTN: false,
      hasEyeKer: false,
      eyemh: '',
      drugHistory: '',
      tel: '',
      birth: '',
      address: '',
      age: 0,
    }
  });

  const formSubmitHandler = form.onSubmit(
    (values, e) => {
      e?.preventDefault();
      dispatch(
        userAuthAction.signUp({
          ...values,
          drugHistory: values.drugHistory.split(','),
          birth: new Date(values.birth),
        }),
      );
      console.log(values);
    },
    (error) => {
      console.error(error);
    },
  );
  return (
    <Box maw={500} mx="auto" px={5} py={10}>
      <Title order={1} ta={'center'} mb={'1em'}>
        نام نویسی در سایت
      </Title>
      <form onSubmit={formSubmitHandler}>
        <Fieldset
          legend={
            <Text size="lg" fw={'bold'}>
              اطلاعات حساب کاربری
            </Text>
          }
        >
          <Group grow>
            <TextInput
              label="نام (به حروف لاتین)"
              key={form.key('firstName_en')}
              {...form.getInputProps('firstName_en')}
            />
            <TextInput
              label="نام خانوادگی (به حروف لاتین)"
              key={form.key('lastName_en')}
              {...form.getInputProps('lastName_en')}
            />
          </Group>
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
        </Fieldset>
        <Fieldset
          legend={
            <Text size="lg" fw={'bold'}>
              اطلاعات هویتی
            </Text>
          }
        >
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
          <Group grow>
            <TextInput
              label="نام پدر"
              key={form.key('fatherName')}
              {...form.getInputProps('fatherName')}
            />
            <TextInput
              type="number"
              maxLength={10}
              label="کد ملی"
              key={form.key('idCode')}
              {...form.getInputProps('idCode')}
            />
          </Group>
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
            <TextInput
              label="وزن"
              type="number"
              leftSection="kg"
              key={form.key('weight')}
              {...form.getInputProps('weight')}
            />
          </Group>
          <Group grow>
            <TextInput
              label="تاریخ تولد"
              type="text"
              key={form.key('birth')}
              {...form.getInputProps('birth')}
            />
            <TextInput
              label="شماره تلفن"
              type="tel"
              key={form.key('tel')}
              {...form.getInputProps('tel')}
            />
          </Group>
        </Fieldset>
        <Fieldset
          legend={
            <Text size="lg" fw={'bold'}>
              اطلاعات اجتماعی- اقتصادی بیمار
            </Text>
          }
        >
          <Group grow>
            <div>
              <InputLabel htmlFor="isMarried">وضعیت تأهل</InputLabel>
              <Input
                id="isMarried"
                component="select"
                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                key={form.key('isMarried')}
                {...form.getInputProps('isMarried')}
                pointer
              >
                <option value="0">مجرد</option>
                <option value="1">متأهل</option>
              </Input>
            </div>
            <div>
              <InputLabel htmlFor="education">سطح تحصیلات</InputLabel>
              <Input
                id="education"
                component="select"
                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                key={form.key('education')}
                {...form.getInputProps('education')}
                pointer
              >
                <option value={0} id="uned">
                  بی‌سواد
                </option>
                <option value={1} id="s">
                  سیکل
                </option>
                <option value={2} id="di">
                  دیپلم
                </option>
                <option value={3} id="fdi">
                  فوق دیپلم
                </option>
                <option value={4} id="l">
                  لیسانس
                </option>
                <option value={5} id="fl">
                  فوق لیسانس
                </option>
                <option value={6} id="do">
                  دکترا
                </option>
                <option value={7} id="fdo">
                  فوق دکترا
                </option>
              </Input>
            </div>
            <TextInput
              label="شغل"
              type="text"
              key={form.key('job')}
              {...form.getInputProps('job')}
            />
          </Group>
          <TextInput
            label="آدرس"
            type="text"
            key={form.key('address')}
            {...form.getInputProps('address')}
          />
        </Fieldset>

        <Fieldset
          legend={
            <Text size="lg" fw={'bold'}>
              اطلاعات مراقب بیمار
            </Text>
          }
        >
          <Group grow>
            <TextInput
              label="نام"
              key={form.key('carerFname')}
              {...form.getInputProps('carerFname')}
            />
            <TextInput
              label="نام خانوادگی"
              key={form.key('carerLname')}
              {...form.getInputProps('carerLname')}
            />
          </Group>
          <Group grow>
            <div>
              <InputLabel htmlFor="carerGender">جنسیت</InputLabel>
              <Input
                id="carerGender"
                component="select"
                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                key={form.key('carerGender')}
                {...form.getInputProps('carerGender')}
                pointer
              >
                <option value="0">مرد</option>
                <option value="1">زن</option>
              </Input>
            </div>
            <TextInput
              label="سن"
              type="number"
              key={form.key('carerAge')}
              {...form.getInputProps('carerAge')}
            />
          </Group>
          <Group grow>
            <div>
              <InputLabel htmlFor="carerEducation">سطح تحصیلات</InputLabel>
              <Input
                id="carerEducation"
                component="select"
                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                key={form.key('carerEducation')}
                {...form.getInputProps('carerEducation')}
                pointer
              >
                <option value={0} id="uned">
                  بی‌سواد
                </option>
                <option value={1} id="s">
                  سیکل
                </option>
                <option value={2} id="di">
                  دیپلم
                </option>
                <option value={3} id="fdi">
                  فوق دیپلم
                </option>
                <option value={4} id="l">
                  لیسانس
                </option>
                <option value={5} id="fl">
                  فوق لیسانس
                </option>
                <option value={6} id="do">
                  دکترا
                </option>
                <option value={7} id="fdo">
                  فوق دکترا
                </option>
              </Input>
            </div>
            <div>
              <InputLabel htmlFor="carerRel">نسبت با بیمار</InputLabel>
              <Input
                id="carerRel"
                component="select"
                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                key={form.key('carerRel')}
                {...form.getInputProps('carerRel')}
                pointer
              >
                <option value={'فرزند'} id="c">
                  فرزند
                </option>
                <option value={'همسر'} id="w">
                  همسر
                </option>
                <option value={'پدر'} id="f">
                  پدر
                </option>
                <option value={'مادر'} id="m">
                  مادر
                </option>
                <option value={'پرستار'} id="n">
                  پرستار
                </option>
                <option value={'سایر'} id="o">
                  سایر
                </option>
              </Input>
            </div>
          </Group>
        </Fieldset>
        <Fieldset
          legend={
            <Text size="lg" fw={'bold'}>
              عادات شخصی بیمار
            </Text>
          }
        >
          <Group grow>
            <Checkbox
              label="بیمار سیگار می‌کشد"
              key={form.key('isSmoker')}
              {...form.getInputProps('isSmoker')}
            />
            <Checkbox
              label="بیمار پیشینه مصرف الکل دارد"
              key={form.key('isAlcoholic')}
              {...form.getInputProps('isAlcoholic')}
            />
          </Group>
        </Fieldset>

        <Fieldset
          legend={
            <Text size="lg" fw={'bold'}>
              سوابق بیماری
            </Text>
          }
        >
          <Checkbox
            label="پیشینه آلرژی"
            mb={'sm'}
            onChange={checkboxHandler(setAlergic)}
          />
          {isAlergic && (
            <TextInput
              placeholder="موارد حساسیت‌زا"
              mb={'md'}
              key={form.key('allergy')}
              {...form.getInputProps('allergy')}
            />
          )}
          <Checkbox
            label="پیشینه بیماری‌های چشم"
            mb={'sm'}
            onChange={checkboxHandler(setEyeDis)}
          />
          {hasEyeDis && (
            <TextInput
              placeholder="نوع بیماری"
              mb={'md'}
              key={form.key('eyemh')}
              {...form.getInputProps('eyemh')}
            />
          )}
          <Checkbox
            label="پیشینه مصرف دارو"
            mb={'sm'}
            onChange={checkboxHandler(setDrug)}
          />
          {drug && (
            <TextInput
              placeholder="نوع داروها"
              mb={'md'}
              key={form.key('drugHistory')}
              {...form.getInputProps('drugHistory')}
            />
          )}
          <Group grow>
            <Checkbox
              label="دیابت"
              key={form.key('hasDiabetes')}
              {...form.getInputProps('hasDiabetes')}
            />
            <Checkbox
              label="فشارخون"
              key={form.key('hasHTN')}
              {...form.getInputProps('hasHTN')}
            />
            <Checkbox
              label="قوز قرنیه ژنتیکی"
              key={form.key('hasEyeKer')}
              {...form.getInputProps('hasEyeKer')}
            />
          </Group>
        </Fieldset>
        <Group mt={'md'} grow>
          <Button type="submit">ثبت</Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignupPanel;
