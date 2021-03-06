import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { ColumnEntity } from './users/entities/column.entity';
import { CardModule } from './cards/card.module';
import { Card } from './users/entities/card.entity';
import { Comment } from './users/entities/comment.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, ColumnEntity, Card, Comment],
      synchronize: false,
    }),
    AuthModule, UsersModule, AuthModule, ColumnsModule, CardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
