import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './services/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    PrismaModule,
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
