import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addYears } from 'date-fns';
import UserStatus from 'src/user/enum/user-status.enum';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import CreditCard from './credit-card.entity';
import Brands from './enum/brands.enum';
import SolicitationStatus from './enum/solicitation-status.enum';
import generateCreditCard from './helpers/generate-credit-card.helper';
import { Solicitation } from './solicitations.entity';
import CreditCardRequestDTO from './types/credit-card-request.dto';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(Solicitation)
    private solicitationRepository: Repository<Solicitation>,
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
    private userService: UserService,
  ) {}

  async createSolicitation(creditCardRequest: CreditCardRequestDTO) {
    // Criar usuário OK
    // Criar a solicitação OK
    // Verificar se foi aprovado
    // Ativar usuário se foi aprovado

    const userScore = 10000;
    const isApproved = userScore >= 600;

    const user = await this.userService.createUser({
      email: creditCardRequest.email,
      name: creditCardRequest.name,
      password: creditCardRequest.password,
      status: isApproved ? UserStatus.ENABLED : UserStatus.DISABLED,
    });

    await this.solicitationRepository.save(
      this.solicitationRepository.create({
        user,
        preferredDueDay: creditCardRequest.preferredDueDay,
        status: isApproved
          ? SolicitationStatus.APPROVED
          : SolicitationStatus.DENIED,
      }),
    );

    if (isApproved) {
      this.generateCreditCardForApprovedSolicitation(user);
    }

    return isApproved;
  }

  private async generateCreditCardForApprovedSolicitation(user: User) {
    const DEFAULT_BRAND = Brands.VISA;

    return await this.creditCardRepository.save(
      this.creditCardRepository.create({
        valid_until: addYears(new Date(), 5),
        number: generateCreditCard(DEFAULT_BRAND),
        cvv: '000',
        brand: DEFAULT_BRAND,
        user,
      }),
    );
  }

  private requestScore() {
    return this.randomIntFromInterval(0, 1000);
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
