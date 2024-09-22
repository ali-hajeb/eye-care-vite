import { userLocalStorageKey } from '../constants';
import IUser from '../types/user';

export default function authHeader() {
  const user = JSON.parse(
    localStorage.getItem(userLocalStorageKey) ?? '{}',
  ) as IUser;

  if (user?.token) {
    return { jwt: user.token };
  }

  return {};
}
