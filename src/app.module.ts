import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photo } from './photo/photo.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '4funq.com.br',
      port: 3306,
      username: 'funke',
      password: 'rootroot',
      database: 'kayzen',
      entities: [User, Photo],
      synchronize: true,
    })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
