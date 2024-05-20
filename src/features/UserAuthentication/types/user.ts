export interface IUserSignUpObject {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  firstName_en: string;
  lastName_en: string;
  fatherName: string;
  weight: number;
  isMarried: number;
  education: number;
  job: string;
  immediateFamily: string;
  carerFname: string;
  carerLname: string;
  carerAge: number;
  carerRel: string;
  carerEducation: number;
  carerGender: number;
  gender: number;
  idCode: string;
  isSmoker: boolean;
  isAlcoholic: boolean;
  allergy: string;
  hasDiabetes: boolean;
  hasHTN: boolean;
  hasEyeKer: boolean;
  eyemh: string;
  drugHistory: string[];
  tel: string;
  birth: Date;
  address: string;
  age: number;
}

export interface IUserLoginObject {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IUserResponseObject {
  token: string;
}

export interface IUserRedux extends IUser {
  isLoggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  response: { code: number; message: string } | null;
}

export default interface IUser {
  id: string;
  email: string;
  token: string;
}
