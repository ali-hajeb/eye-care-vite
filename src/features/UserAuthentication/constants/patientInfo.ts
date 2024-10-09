import { IPatient } from '../../../common/types';

export type PatientInfoFields = keyof IPatient;

export const patientInfoFields: Record<PatientInfoFields, string> = {
  _id: 'id',
  firstName: 'نام',
  lastName: 'نام خانوادگی',
  firstName_en: 'نام (لاتین)',
  lastName_en: 'نام خانوادگی (لاتین)',
  fatherName: 'نام پدر',
  gender: 'جنسیت',
  weight: 'وزن',
  // age: 'سن',
  birth: 'تاریخ تولد',
  idCode: 'کد ملی',
  isMarried: 'وضعیت تأهل',
  education: 'تحصیلات',
  job: 'شغل',
  tel: 'تلفن',
  address: 'نشانی',
  email: 'ایمیل',
  meds: 'داروهای درحال مصرف',
  isSmoker: 'سابقه استعمال سیگار',
  isAlcoholic: 'سابقه مصرف الکل',
  hasDiabetes: 'دیابت',
  hasHTN: 'فشار خون',
  hasEyeKer: 'قوز قرنیه',
  allergy: 'آلرژی‌ها',
  eyemh: 'پیشینه بیماری‌های چشمی',
  drugHistory: 'تاریخچه دارویی',
  nobat: 'تاریخچه ویزیت',
  immediateFamily: 'نزدیکان',
  carerFname: 'نام مراقب',
  carerLname: 'نام خانوادگی مراقب',
  carerAge: 'سن مراقب',
  carerRel: 'نسبت با مراقب',
  carerEducation: 'تحصیلات مراقب',
  carerGender: 'جنسیت مراقب',
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
