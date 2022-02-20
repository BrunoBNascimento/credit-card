import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardModule } from './credit-card/credit-card.module';
import { User } from './user/user.entity';
import { Solicitation } from './credit-card/solicitations.entity';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransactionModule } from './transaction/transaction.module';
import { StatementModule } from './statement/statement.module';
import CreditCard from './credit-card/credit-card.entity';
import Transaction from './transaction/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'creditcard',
      entities: [User, Solicitation, CreditCard, Transaction],
      synchronize: true,
    }),
    CreditCardModule,
    UserModule,
    AuthModule,
    TransactionModule,
    StatementModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
