import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from 'src/entities/tasks.entity';
import { TaskController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}