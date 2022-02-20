import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Transaction from 'src/transaction/transaction.entity';
import PaginatedResultDTO from 'src/types/paginated-result.dto';
import { Repository } from 'typeorm';
import StatementFilterDTO from './types/statement-filter.dto';

@Injectable()
export class StatementService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async paginate(params: StatementFilterDTO) {
    const { page, limit, from, to } = params;

    const queryBuilder =
      this.transactionRepository.createQueryBuilder('transaction');

    const skip = page * limit;
    const take = limit;
    const [result, total] = await queryBuilder
      .where('transaction.date between :from AND :to', { from, to })
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return new PaginatedResultDTO<Transaction>(result, page, limit, total);
  }
}
