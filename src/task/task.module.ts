import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { Task } from './task.entity';
import { TaskController } from './controllers/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
