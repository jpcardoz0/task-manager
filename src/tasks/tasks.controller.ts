import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dtos/CreateTaskDto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';
import { AuthGuard } from '@nestjs/passport';

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

    @UseGuards(AuthGuard('jwt'))
    @Post('users/:userId')
    @UsePipes(new ValidationPipe())
    async createTask(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() createTaskDto: CreateTaskDto,
    ) {
        return this.taskService.createTask(userId, createTaskDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('users/:taskId')
    @UsePipes(new ValidationPipe())
    async updateTask(
        @Param('taskId', ParseIntPipe) taskId: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.taskService.updateTask(taskId, updateTaskDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('users/:taskId')
    deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
        return this.taskService.deleteTask(taskId);
    }
}