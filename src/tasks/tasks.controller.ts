import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from 'src/entities/tasks.entity';
import { CreateTaskDto } from './dtos/CreateTaskDto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('users')
    getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Get('users/:userId')
    getTask(@Param('userId', ParseIntPipe) userId: number) {
        return this.taskService.getTask(userId);
    }

    @Post('users/:userId')
    @UsePipes(new ValidationPipe())
    async createTask(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() createTaskDto: CreateTaskDto,
    ) {
        return this.taskService.createTask(userId, createTaskDto);
    }

    @Put('users/:taskId')
    @UsePipes(new ValidationPipe())
    async updateTask(
        @Param('taskId', ParseIntPipe) taskId: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.taskService.updateTask(taskId, updateTaskDto);
    }

    @Delete('users/:taskId')
    deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
        return this.taskService.deleteTask(taskId);
    }
}