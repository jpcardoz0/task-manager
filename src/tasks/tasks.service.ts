import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/tasks.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/CreateTaskDto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';

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
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }
        const task = await this.taskRepository.find({
            where: { user: {id: userId}}, 
            relations: ['user'], 
        });
        return task;
    }

    async createTask(userId:number, createTaskDto: CreateTaskDto): Promise<Task> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }
        const newTask = this.taskRepository.create({
            title: createTaskDto.title, desc: createTaskDto.desc, user
        });
        await this.taskRepository.save(newTask);
        return newTask;
    }

    async updateTask(taskId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        await this.taskRepository.update(taskId, updateTaskDto);
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