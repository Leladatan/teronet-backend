import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UserType } from '@prisma/client';
import { EmployerDto, JobSeekerDto } from '@/modules/users/dto/users.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return user by id' })
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('type/:type')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users by type' })
  @ApiResponse({ status: 200, description: 'Return users by type' })
  async findByTypeAllUsers(
    @Param('type') type: UserType,
    @Query('search') search: string,
    @Query('offset') offset: string,
    @Query('limit') limit: string,
  ) {
    const offsetNum = offset ? parseInt(offset, 10) : 0;
    const limitNum = limit ? parseInt(limit, 10) : 10;

    return this.usersService.findByTypeAllUsers({
      type,
      search,
      offset: offsetNum,
      limit: limitNum,
    });
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // Employer

  @Post('')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createEmployer(
    @Body()
    data: EmployerDto,
  ) {
    return this.usersService.createEmployer(data);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async updateEmployer(
    @Param('id') id: string,
    @Body()
    data: EmployerDto,
  ) {
    return this.usersService.updateEmployer(id, data);
  }

  // JobSeeker

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async createJobSeeker(
    @Body()
    data: JobSeekerDto,
  ) {
    return this.usersService.createJobSeeker(data);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async updateJobSeeker(
    @Param('id') id: string,
    @Body()
    data: JobSeekerDto,
  ) {
    return this.usersService.updateJobSeeker(id, data);
  }
}
