import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../task.entity';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('users/:userId')
    getTasks(@Param('userId', ParseIntPipe) userId: number,) {
        return this.taskService.getTasks(userId);
    }

    @Post(':userId')
    async createTask(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() body: { title: string, desc: string },
    ) {
        return this.taskService.createTask(userId, body.title, body.desc);
    }

    // @Put(':id')
    // updateTask(@Param('id') id: number, @Body() task: Partial<Task>) {
    //     return this.taskService.updateTask(id, task);
    // }

    // @Delete(':id')
    // deleteTask(@Param('id') id: number) {
    //     return this.taskService.deleteTask(id);
    // }
}
