import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
  ) {}

  async getBalanceByCreditCardNumber(creditCard: string) {
    const creditCardFound = await this.creditCardRepository.findOne({
      number: creditCard,
    });

    if (!creditCardFound) {
      throw new BadRequestException('Este cartão não foi encontrado');
    }

    return creditCardFound.disponible;
  }
}
