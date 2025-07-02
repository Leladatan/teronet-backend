import { UserRole, UserType } from '@prisma/client';

export type EmployerType = {
  id: string;
  email: string;
  telegram: string;
  role: UserRole;
  type: UserType;
  password: string;
  employer: {
    name: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type JobSeekerType = {
  id: string;
  email: string;
  telegram: string;
  role: UserRole;
  type: UserType;
  password: string;
  jobSeeker: {
    firstName: string;
    lastName: string;
    description?: string;
    softSkills?: string[];
    hardSkills?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
};

export type FindUserByType = {
  type: UserType;
  offset: number;
  limit: number;
};
