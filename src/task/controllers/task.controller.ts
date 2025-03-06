import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../task.entity';

@Controller('task')
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
    async createTask(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() body: { title: string, desc: string },
    ) {
        return this.taskService.createTask(userId, body.title, body.desc);
    }

    @Put('users/:taskId')
    updateTask(
        @Param('taskId', ParseIntPipe) taskId: number,
        @Body() updateData: Partial<Task>,
    ) {
        return this.taskService.updateTask(taskId, updateData);
    }

    @Delete('users/:taskId')
    deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
        return this.taskService.deleteTask(taskId);
    }
}
