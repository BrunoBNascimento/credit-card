import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillService } from 'src/bill/bill.service';
import CreditCard from 'src/credit-card/credit-card.entity';
import { Repository } from 'typeorm';
import Transaction from './transaction.entity';
import CreateTransactionDTO from './types/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
    private billService: BillService,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDTO) {
    const { credit_card } = createTransactionDto;

    const creditCard = await this.creditCardRepository.findOne({
      number: credit_card,
    });

    if (!creditCard) {
      throw new BadRequestException('Cartão de crédito não existe');
    }

    const hasLimit = creditCard.disponible >= createTransactionDto.value;

    if (!hasLimit) {
      throw new BadRequestException('Não há limite disponível');
    }

    const userDueDate = new Date().toISOString();

    const bill = await this.billService.createBillForUserIfDoesNotExist(
      creditCard.user,
      userDueDate,
    );

    const entity = this.transactionRepository.create({
      date: new Date().toISOString(),
      value: createTransactionDto.value,
      credit_card: creditCard,
      user: creditCard.user,
      bill,
    });

    this.creditCardRepository.update(creditCard.id, {
      disponible: creditCard.disponible - createTransactionDto.value,
    });

    return this.transactionRepository.save(entity);
  }
}
