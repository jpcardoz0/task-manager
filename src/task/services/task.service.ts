import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../task.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async getAllTasks() {
        const tasks = await this.taskRepository.find();
        return tasks;
    }

    async getTask(userId: number): Promise<Task[]> {
        const task = await this.taskRepository.find({
            where: { user: {id: userId}}, 
            relations: ['user'], 
        });
        return task;
    }

    async createTask(userId: number, title: string, desc:string): Promise<Task> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        const newTask = this.taskRepository.create({ title, desc, user });
        return this.taskRepository.save(newTask);
    }

    async updateTask(taskId: number, updateData: Partial<Task>): Promise<Task> {
        await this.taskRepository.update(taskId, updateData);
        const task = await this.taskRepository.findOne({ where: {id: taskId } })
        if (!task) {
            throw new NotFoundException('Tarefa não encontrada.');
        }
        return task;
    }

    async deleteTask(taskId: number): Promise<void> {
        await this.taskRepository.delete(taskId);
    }
}
