import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as os from 'os';
import { BaseConfig } from '../config/base/base.config';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly baseConfig: BaseConfig,
  ) {}

  @Get()
  getHelloApp(): string {
    return this.appService.getHello();
  }

  @Get('version')
  async getVersionApp(): Promise<string> {
    const version = await this.baseConfig.getVersion('VERSION_2');
    const hostname = os.hostname();
    return `<h1>VERSION: ${version}. Hello from ${hostname}</h1>`;
  }

  @Get('heroku-version')
  async getHerokuVersion(): Promise<any> {
    const url = 'https://series-lounge-3112bdef3757.herokuapp.com/version';
    try {
      const response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Heroku version:', error.message);
      throw new Error('Failed to fetch Heroku version');
    }
  }

  @Get('placeholder/posts')
  async jsonPlaceholder(): Promise<any> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    try {
      const response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching placeholder:', error.message);
      throw new Error('Failed to fetch placeholder');
    }
  }
}
