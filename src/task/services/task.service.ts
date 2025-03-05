import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,
    ) {}

    findAllTasks() {
        return this.taskRepository.find();
    }

    async findTask(id: number): Promise<Task> {
        const task = await this.taskRepository.findOneBy({id});
        if (!task) {
            throw new Error(`Tarefa com id ${id} não encontrada`)
        }
        return task;
    }

    createTask(task: Task): Promise<Task> {
        return this.taskRepository.save(task)
    }

    async updateTask(id: number, task: Partial<Task>): Promise<Task> {
        await this.taskRepository.update(id, task);
        return this.findTask(id);
    }

    async deleteTask(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }
}
