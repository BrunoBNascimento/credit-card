import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import BillTask from './bill.task';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bill from './bill.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { Solicitation } from 'src/credit-card/solicitations.entity';
import CreditCard from 'src/credit-card/credit-card.entity';
import { CreditCardService } from 'src/credit-card/credit-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, User, Solicitation, CreditCard])],
  providers: [BillService, BillTask, UserService, CreditCardService],
  controllers: [BillController],
})
export class BillModule {}
