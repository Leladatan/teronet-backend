import { UserRole, UserType } from '@prisma/client';

export type UserResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
};
