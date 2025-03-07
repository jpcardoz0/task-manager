import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
=======
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
>>>>>>> d692d47 (commit inicial)

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
<<<<<<< HEAD
export class UsersModule {}
=======
export class UsersModule {}
>>>>>>> d692d47 (commit inicial)
