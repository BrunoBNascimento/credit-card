import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Solicitation } from './solicitations.entity';
import CreditCardRequestDTO from './types/credit-card-request.dto';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(Solicitation)
    private solicitationRepository: Repository<Solicitation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async createSolicitation(creditCardRequest: CreditCardRequestDTO) {
    // Criar usuário OK
    // Criar a solicitação OK
    // Verificar se foi aprovado
    // Ativar usuário se foi aprovado

    const userScore = this.requestScore();
    const isApproved = userScore >= 600;

    const user = await this.userService.createUser({
      email: creditCardRequest.email,
      name: creditCardRequest.name,
      password: creditCardRequest.password,
      status: isApproved ? 'ENABLED' : 'DISABLED',
    });

    await this.solicitationRepository.save(
      this.solicitationRepository.create({
        user,
        preferredDueDay: creditCardRequest.preferredDueDay,
        status: isApproved ? 'APPROVED' : 'DENIED',
      }),
    );

    return isApproved;
  }

  private requestScore() {
    return this.randomIntFromInterval(0, 1000);
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
