import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { addYears } from 'date-fns';

import { Repository } from 'typeorm';
import CreditCard from './credit-card.entity';
import { Solicitation } from './solicitations.entity';
import CreditCardRequestDTO from './types/credit-card-request.dto';
import generateCreditCard from './helper/generate-credit-card';
import Brands from './enum/brands.enum';
import UserStatus from 'src/user/enum/user-status.enum';
import SolicitationStatus from './enum/solicitation-status.enum';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(Solicitation)
    private solicitationRepository: Repository<Solicitation>,
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async createSolicitation(creditCardRequest: CreditCardRequestDTO) {
    const userScore = this.requestScore();
    const isApproved = userScore >= 600;

    const userStatus = isApproved ? UserStatus.ENABLED : UserStatus.DISABLED;
    const solicitationStatus = isApproved
      ? SolicitationStatus.APPROVED
      : SolicitationStatus.DENIED;

    const user = await this.userService.createUser({
      email: creditCardRequest.email,
      name: creditCardRequest.name,
      password: creditCardRequest.password,
      status: userStatus,
    });

    await this.solicitationRepository.save(
      this.solicitationRepository.create({
        user,
        preferredDueDay: creditCardRequest.preferredDueDay,
        status: solicitationStatus,
      }),
    );

    if (isApproved) {
      await this.generateCreditCardForApprovedSolicitation(user);
    }

    return isApproved;
  }

  private async generateCreditCardForApprovedSolicitation(user: User) {
    // gerar cartão com limite padrao
    // validade padrao de 5 anos

    return await this.creditCardRepository.save(
      this.creditCardRepository.create({
        valid_until: addYears(new Date(), 5).toISOString(),
        number: generateCreditCard(Brands.VISA),
        cvv: '000',
        brand: Brands.VISA,
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
