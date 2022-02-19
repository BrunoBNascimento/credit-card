import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDTO) {
    // Buscar o cartão
    // verificar limite disponivel
    // caso nao encontre estourar o erro
    // caso encontre passar para a transação

    const { credit_card } = createTransactionDto;
    const creditCard = await this.creditCardRepository.findOne({
      number: credit_card,
    });

    if (!creditCard) {
      throw new BadRequestException('Cartão de crédito não encontrado');
    }

    if (creditCard.disponible < createTransactionDto.value) {
      throw new BadRequestException('Não há limite suficiente');
    }

    const transaction = this.transactionRepository.create({
      date: new Date(),
      credit_card: creditCard,
      value: createTransactionDto.value,
    });

    this.creditCardRepository.update(creditCard.id, {
      disponible: creditCard.disponible - createTransactionDto.value,
    });

    return this.transactionRepository.save(transaction);
  }
}
