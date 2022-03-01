import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bill from './bill.entity';
import { BillTask } from './bill.task';
import Transaction from 'src/transaction/transaction.entity';
import { Solicitation } from 'src/credit-card/solicitations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, Transaction, Solicitation])],
  providers: [BillService, BillTask],
  controllers: [BillController],
})
export class BillModule {}
