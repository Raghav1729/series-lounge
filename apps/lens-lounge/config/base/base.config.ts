import { ConfigType } from '../configuration';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvNamesEnums } from '../enums/env-names.enums';
import { ThrottleTypes } from '../throttle/types/throttle.types';
import { VersionType } from './types/version-type';

@Injectable()
export class BaseConfig {
  constructor(protected configService: ConfigService<ConfigType, true>) {}
  /**
   * Retrieves the value of the 'ENV' environment variable and returns it as a Promise of `EnvNamesEnums`.
   * @returns {Promise<EnvNamesEnums>} The value of the 'ENV' environment variable.
   */
  async getValueENV(): Promise<EnvNamesEnums> {
    return this.configService.get('ENV', {
      infer: true,
    });
  }

  async getVersion(key: VersionType): Promise<string> {
    return this.configService.get('version', {
      infer: true,
    })[key];
  }

  /**
   * Retrieves a specific key from the 'throttle' configuration property and returns its value.
   * It also checks whether the value is a valid number by calling the `validationNumbersType` method.
   * @param {ThrottleTypes} key - The key of the 'throttle' configuration property to retrieve.
   * @returns {Promise<any>} The value of the specified key from the 'throttle' configuration property.
   * @throws {InternalServerErrorException} If the value is not a valid number.
   */
  protected async getValueThrottle(key: ThrottleTypes): Promise<number> {
    const value = this.configService.get('throttle', {
      infer: true,
    })[key];
    await this.validationNumbersType(value);
    return value;
  }

  /**
   * Utility method used internally to validate whether the given `value` can be converted to a number.
   * @param {any} value - The value to be validated.
   * @returns {any} The original value if it can be converted to a number.
   * @throws {InternalServerErrorException} If the value cannot be converted to a number.
   */
  protected async validationNumbersType(value: any): Promise<number> {
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      throw new InternalServerErrorException({
        message: `incorrect configuration , cannot be found ${value}. Or isNaN(parsedValue)`,
      });
    }
    return value;
  }
}
