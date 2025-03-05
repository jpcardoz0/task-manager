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

    async getTasks(userId: number): Promise<Task[]> {
        const task = await this.taskRepository.find({
            where: { user: {id: userId}}, 
            relations: ['user'], 
        });
        if (!task) {
            throw new Error(`Usuário de id ${userId} não tem tarefas.`)
        }
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

    // async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    //     await this.taskRepository.update(id, task);
    //     return this.findTask(id);
    // }

    // async deleteTask(id: number): Promise<void> {
    //     await this.taskRepository.delete(id);
    // }
}
