import { Body, Param, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUser(Number(id));
    }

    @Post()
    createUser(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: User) {
        return this.userService.updateUser(Number(id), user);
    }

    @Delete(':id')
    deleteUser(@Param() id: number) {
        return this.userService.deleteUser(id);
    }
}