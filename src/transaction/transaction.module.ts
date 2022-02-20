import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';
import { TransactionController } from './transaction.controller';
import Transaction from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, CreditCard])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
