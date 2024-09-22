export type IMajor = 'عمومی' | 'متخصص' | 'فوق تخصص';
export interface IUserSignUpObject {
  password: string;
  firstName: string;
  lastName: string;
  gender: boolean;
  idCode: string;
  field: string;
  major: IMajor;
  nezam: string;
  workDays?: number[];
  maxPatients?: number
}

export interface IUserLoginObject {
  idCode: string;
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
  _id: string;
  idCode: string;
  token: string;
}
