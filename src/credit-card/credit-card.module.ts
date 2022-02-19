import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { CreditCardController } from './credit-card.controller';
import CreditCard from './credit-card.entity';
import { CreditCardService } from './credit-card.service';
import { Solicitation } from './solicitations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Solicitation, CreditCard])],
  controllers: [CreditCardController],
  providers: [CreditCardService, UserService],
  exports: [TypeOrmModule],
})
export class CreditCardModule {}
