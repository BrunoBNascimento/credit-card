import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import SolicitationStatus from 'src/credit-card/enum/solicitation-status.enum';
import { Solicitation } from 'src/credit-card/solicitations.entity';
import { Repository } from 'typeorm';
import Bill from './bill.entity';
import BillStatus from './enum/bill-status.enum';
import { addDays, differenceInMinutes, startOfMonth } from 'date-fns';

@Injectable()
export class BillTask {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(Solicitation)
    private solicitationRepository: Repository<Solicitation>,
  ) {}

  private readonly logger = new Logger(BillTask.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleBillsUpdate() {
    this.logger.debug('All transactions are grouped and bills are generated');
    // procurar as bills waiting payment
    // iterar as bills retornadas e buscar o preferred due day do usuário da bill
    // caso esteja vencida, mudar o status

    const waitingPaymentBills = await this.billRepository.find({
      status: BillStatus.WAITING_PAYMENT,
    });

    waitingPaymentBills.forEach(async (bill) => {
      const userSolicitation = await this.solicitationRepository.findOne({
        where: {
          user: bill.user,
          status: SolicitationStatus.APPROVED,
        },
      });

      const { preferredDueDay } = userSolicitation;
      const dueDate = addDays(startOfMonth(new Date()), preferredDueDay);
      const diff = differenceInMinutes(dueDate, new Date());

      if (diff <= 0) {
        await this.billRepository.update(bill.id, {
          status: BillStatus.OVERDUE,
          dueDate: dueDate.toISOString(),
        });
      }
    });
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleBillsUpdateAmountAndMinimal() {
    this.logger.debug('All bills values updated!');

    const waitingPaymentBills = await this.billRepository.find({
      where: {
        status: BillStatus.WAITING_PAYMENT,
      },
    });

    waitingPaymentBills.forEach(async (bill) => {
      const amount = bill.transactions.reduce(
        (acc, { value }) => acc + value,
        0,
      );
      const TEN_PERCENT = 0.1;

      await this.billRepository.update(bill.id, {
        amount,
        minimal: amount * TEN_PERCENT,
      });
    });
  }
}
