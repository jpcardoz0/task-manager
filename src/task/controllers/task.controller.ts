import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../task.entity';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    findAllTasks() {
        return this.taskService.findAllTasks();
    }

    @Get(':id')
    findTask(@Param('id') id: number) {
        return this.taskService.findTask(id);
    }

    @Post()
    createTask(@Body() task: Task) {
        return this.taskService.createTask(task);
    }

    @Put(':id')
    updateTask(@Param('id') id: number, @Body() task: Partial<Task>) {
        return this.taskService.updateTask(id, task);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: number) {
        return this.taskService.deleteTask(id);
    }
}
