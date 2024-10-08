import { IPatient } from '../../../common/types';

export type PatientInfoFields = keyof IPatient;

export const patientInfoFields: Record<PatientInfoFields, string> = {
  _id: 'id',
  firstName: 'نام',
  lastName: 'نام خانوادگی',
  firstName_en: 'نام (لاتین)',
  lastName_en: 'نام خانوادگی (لاتین)',
  weight: 'وزن',
  isMarried: 'وضعیت تأهل',
  education: 'تحصیلات',
  carerFname: 'نام مراقب',
  carerLname: 'نام خانوادگی مراقب',
  carerAge: 'سن مراقب',
  carerEducation: 'تحصیلات مراقب',
  carerGender: 'جنسیت مراقب',
  gender: 'جنسیت',
  idCode: 'کد ملی',
  isSmoker: 'سابقه استعمال سیگار',
  isAlcoholic: 'سابقه مصرف الکل',
  hasDiabetes: 'دیابت',
  hasHTN: 'فشار خون',
  hasEyeKer: 'قوز قرنیه',
  birth: 'تاریخ تولد',
  address: 'نشانی',
  email: 'ایمیل',
  meds: 'داروها',
  age: 'سن',
  allergy: 'آلرژی‌ها',
  carerRel: 'نسبت با مراقب',
  drugHistory: 'تاریخچه دارویی',
  eyemh: 'پیشینه بیماری‌های چشمی',
  fatherName: 'نام پدر',
  immediateFamily: 'نزدیکان',
  job: 'شغل',
  tel: 'تلفن',
  nobat: 'تاریخچه ویزیت'
};

export const EDUCATION = [
  'بی‌سواد',
  'سیکل',
  'دیپلم',
  'فوق دیپلم',
  'لیسانس',
  'فوق لیسانس',
  'دکترا',
  'فوق دکترا',
];

export const patientBooleanFields = [
  'isSmoker',
  'isAlcoholic',
  'hasDiabetes',
  'hasHTN',
  'hasEyeKer',
];

export const patientGenderFields = ['gender', 'carerGender'];
export const patientEducationFields = ['education', 'carerEducation'];
