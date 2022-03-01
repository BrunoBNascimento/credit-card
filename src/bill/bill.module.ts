import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import BillTask from './bill.task';

@Module({
  controllers: [BillController],
  providers: [BillService, BillTask],
})
export class BillModule {}
