import { USER_TYPES, UserType } from './types';

export function isUserHasValidType(type: string): type is UserType {
  return USER_TYPES.includes(type as UserType);
}
