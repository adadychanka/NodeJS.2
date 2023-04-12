export enum UserType {
  student = 'student',
  developer = 'developer',
  manager = 'manager',
  tester = 'tester',
  trainee = 'trainee',
}

export const USER_TYPES = Object.values(UserType);

export type UsersSearchQuery = {
  fullName: string;
  minAge: number;
  maxAge: number;
  type: string | UserType;
};
