import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserType } from '@prisma/client';

export class User {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: '@example', description: 'User telegram' })
  telegram: string;

  @ApiProperty({ example: 'John', description: 'User first name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  lastName: string;

  @ApiProperty({ example: 'password', description: 'User password (hashed)' })
  password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'User role',
  })
  role: UserRole;

  @ApiProperty({
    enum: UserType,
    example: UserType.JOB_SEEKER,
    description: 'User type',
  })
  type: UserType;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Created at timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Updated at timestamp',
  })
  updatedAt: Date;
}
