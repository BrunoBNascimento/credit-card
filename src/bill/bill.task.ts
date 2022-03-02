import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BillService } from './bill.service';

@Injectable()
class BillTask {
  constructor(private billService: BillService) {}
  private readonly logger = new Logger(BillTask.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleBillsGeneration() {
    this.logger.debug('All bills are generated');

    this.billService.createBill();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleBillsUpdateAmountAndMinimal() {
    this.logger.debug('All values are updated');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleBillsUpdateStatus() {
    this.logger.debug('All status updated');
  }
}

export default BillTask;
