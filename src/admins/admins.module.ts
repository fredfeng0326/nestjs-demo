import { AdminsController } from './controllers/admins.controller';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule],
  controllers: [AdminsController],
})
export class AdminsModule {}
