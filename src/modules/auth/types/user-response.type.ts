import { UserRole, UserType } from '@prisma/client';

export type EmployerResponse = {
  id: string;
  email: string;
  telegram: string;
  name: string;
  role: UserRole;
  type: UserType;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type JobSeekerResponse = {
  id: string;
  email: string;
  telegram: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  type: UserType;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
