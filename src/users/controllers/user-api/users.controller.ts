import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import {
  CreateUserDto,
  DefaultColumnsResponse,
} from '../../dto/create-user.dto';
import { UsersService } from '../../services/users.service';

@ApiTags('users') // put the name of the controller in swagger
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) //  makes the all routs as private by default
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'create a user with customer role' })
  @ApiResponse({
    status: 201,
    type: DefaultColumnsResponse,
  })
  @Public() // makes the endpoint accessible to all
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
