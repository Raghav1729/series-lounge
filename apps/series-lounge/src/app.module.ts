import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './features/auth/auth.module';
import { PostsModule } from './features/posts/posts.module';
import { CommentsModule } from './features/comments/comments.module';
import { UsersModule } from './features/users/users.module';
import { MailsModule } from './common/mails/mails.module';
import { PipesModule } from './common/pipes/pipes.module';
import { CustomConfigModule } from '../config/custom.config-module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerOptions } from '../config/throttle/throttler-options';
import { BaseConfig } from '../config/base/base.config';

@Module({
  imports: [
    CustomConfigModule,
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerOptions, // Use the ThrottlerModuleOptions class as the stripe
    }),
    SocketModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    UsersModule,
    MailsModule,
    PipesModule,
  ],
  controllers: [AppController],
  providers: [AppService, BaseConfig],
})
export class AppModule {}
