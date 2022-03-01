import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays, addMonths, format, startOfMonth } from 'date-fns';
import { CreditCardService } from 'src/credit-card/credit-card.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import Bill from './bill.entity';

@Injectable()
export class BillService {
  constructor(
    private userService: UserService,
    private creditCardService: CreditCardService,
    @InjectRepository(Bill) private billRepository: Repository<Bill>,
  ) {}

  async createBill() {
    const usersWithoutBills = await this.userService.getUsersWithNoBills();

    usersWithoutBills.forEach(async (user) => {
      const preferredDueDay =
        await this.creditCardService.getUserPreferredDueDay(user);

      const dueDate = format(
        addDays(startOfMonth(addMonths(new Date(), 1)), preferredDueDay),
        'yyyy-MM-dd',
      );

      await this.billRepository.save(
        this.billRepository.create({
          user,
          dueDate,
        }),
      );
    });
  }
}
