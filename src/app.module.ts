import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
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
import { BalanceService } from './balance/balance.service';
import { BalanceModule } from './balance/balance.module';
import { BillModule } from './bill/bill.module';
import CreditCard from './credit-card/credit-card.entity';
import Transaction from './transaction/transaction.entity';
import Bill from './bill/bill.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'creditcard',
      entities: [User, Solicitation, CreditCard, Transaction, Bill],
      synchronize: true,
    }),
    CreditCardModule,
    UserModule,
    AuthModule,
    TransactionModule,
    StatementModule,
    BalanceModule,
    BillModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    BalanceService,
  ],
})
export class AppModule {}
