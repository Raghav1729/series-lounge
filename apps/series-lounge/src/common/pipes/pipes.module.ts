import { Module } from '@nestjs/common';
import { TrimPipe } from './trim.pipe';

@Module({
  providers: [TrimPipe],
  exports: [TrimPipe],
})
export class PipesModule {}
