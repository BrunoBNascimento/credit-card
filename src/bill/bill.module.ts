import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import BillTask from './bill.task';
import { BillController } from './bill.controller';

@Module({
  providers: [BillService, BillTask],
  controllers: [BillController],
})
export class BillModule {}
