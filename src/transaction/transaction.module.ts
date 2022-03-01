import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bill from 'src/bill/bill.entity';
import { BillService } from 'src/bill/bill.service';
import CreditCard from 'src/credit-card/credit-card.entity';
import { TransactionController } from './transaction.controller';
import Transaction from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, CreditCard, Bill])],
  controllers: [TransactionController],
  providers: [TransactionService, BillService],
})
export class TransactionModule {}
