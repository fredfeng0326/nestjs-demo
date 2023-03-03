import { UsersService } from '../../users/services/users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TopUpDto } from '../dto/top-up.dto';

@ApiTags('admins') // put the name of the controller in swagger
@Controller('admins')
export class AdminsController {
  constructor(private readonly usersService: UsersService) {}

  @Post('top-up')
  async topUp(@Body() topUpDto: TopUpDto) {
    return this.usersService.addBalance(topUpDto.userId, topUpDto.amount);
  }
}
