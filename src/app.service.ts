import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ApiTitle(): string {
    return 'Task manager';
  }
}
