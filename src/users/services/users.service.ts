import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    getAllUsers() {
        return this.userRepository.find();
    }

    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({id})
        if (!user) {
            throw new Error(`Usuário com id ${id} não encontrado.`)
        }
        return user;
    }

    async createUser(user: User): Promise <User> {
        const { username } = user;
        const existingUser = await this.userRepository.findOne({ where: { username } });

        if(existingUser) {
            throw new ConflictException('Esse nome de usuário já está em uso.');
        }

        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async updateUser(id: number, user: Partial<User>): Promise<User> {
        await this.userRepository.update(id, user);
        return this.getUser(id);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
