import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EmployersService } from '@/modules/employers/employers.service';
import { ItemsPayloadDto } from '@/shared/dto/items.dto';
import { Employer } from '@prisma/client';
import { EmployersDto } from '@/modules/employers/dto/employers.dto';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Get()
  async getEmployers(
    @Query() query: { limit: string; offset: string },
  ): Promise<ItemsPayloadDto<Employer>> {
    return this.employersService.getEmployers({
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Post()
  async createEmployer(@Body() payload: EmployersDto): Promise<Employer> {
    return this.employersService.createEmployer(payload);
  }

  @Patch(':id')
  async updateEmployerId(
    @Param('id') id: string,
    @Body() payload: EmployersDto,
  ): Promise<Employer> {
    return this.employersService.updateEmployerId({
      id: Number(id),
      ...payload,
    });
  }

  @Delete(':id')
  async deleteEmployerId(@Param('id') id: string): Promise<Employer> {
    return this.employersService.deleteEmployerId(Number(id));
  }
}
