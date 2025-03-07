import { Injectable } from '@nestjs/common';

import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';
import { BaseConfig } from '../base/base.config';

@Injectable()
export class ThrottlerOptions
  extends BaseConfig
  implements ThrottlerOptionsFactory
{
  async createThrottlerOptions(): Promise<ThrottlerModuleOptions> {
    const ttl: number = await this.getValueThrottle('THROTTLE_TTL');
    const limit: number = await this.getValueThrottle('THROTTLE_LIMIT');
    return { throttlers: [{ ttl: ttl, limit: limit }] };
  }
}
