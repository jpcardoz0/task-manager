import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'usuario_teste',
      password: 'senha123',
      database: 'taskdb',
      autoLoadEntities: true,
      synchronize: true,
  }),
  TaskModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
