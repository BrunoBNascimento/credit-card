import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import Bill from './bill.entity';
import BillDomain from './domain/bill';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill) private billRepository: Repository<Bill>,
  ) {}

  async groupByDueDate(from: string, to: string) {
    const bills = await this.billRepository
      .createQueryBuilder('b')
      .innerJoinAndSelect('b.transactions', 'transactions')
      .where('b.dueDate between :from AND :to', { from, to })
      .getMany();

    return bills;
  }

  async createBillForUserIfDoesNotExist(user: User, dueDate: string) {
    const currentMonthBill = await this.billRepository.findOne({
      user,
      dueDate,
    });

    if (!currentMonthBill) {
      const bill = new BillDomain(dueDate, [], user);

      return await this.billRepository.save(this.billRepository.create(bill));
    }

    return currentMonthBill;
  }

  getBills(from: string, to: string) {
    return this.groupByDueDate(from, to);
  }
}
