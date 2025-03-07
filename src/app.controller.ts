import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
<<<<<<< HEAD
  getHello(): string {
    return this.appService.getHello();
=======
  ApiTitle(): string {
    return this.appService.ApiTitle();
>>>>>>> d692d47 (commit inicial)
  }
}
