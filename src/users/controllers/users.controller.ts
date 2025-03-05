import { Body, Param, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param() id: number) {
        return this.userService.getUser(id);
    }

    @Post()
    createUser(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Put(':id')
    updateUser(@Param() id: number, @Body() user: User) {
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    deleteUser(@Param() id: number) {
        return this.userService.deleteUser(id);
    }
}
