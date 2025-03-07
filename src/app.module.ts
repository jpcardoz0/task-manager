import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
=======
import { UsersModule } from './users/users.module';
import { TaskModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
>>>>>>> d692d47 (commit inicial)

@Module({
  imports: [
    TypeOrmModule.forRoot({
<<<<<<< HEAD
      type:'mysql',
=======
      type: 'mysql',
>>>>>>> d692d47 (commit inicial)
      host: 'localhost',
      port: 3306,
      username: 'usuario_teste',
      password: 'senha123',
      database: 'taskdb',
      autoLoadEntities: true,
      synchronize: true,
<<<<<<< HEAD
  }),
  TaskModule,
  UsersModule,
  AuthModule,
],
=======
    }),
    TaskModule,
    UsersModule,
    AuthModule,
  ],
>>>>>>> d692d47 (commit inicial)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
