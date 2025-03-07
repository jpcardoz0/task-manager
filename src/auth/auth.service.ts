import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtServivce: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOneBy({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Usuário e/ou senha incorretos.')
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtServivce.sign(payload),
        };
    }

    async register(username:string, password: string) {
        const newUser = await this.userRepository.create({ username, password });
        await this.userRepository.save(newUser);
        return { message: 'Usuário registrado com sucesso!' };
    }
}