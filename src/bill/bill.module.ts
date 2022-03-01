import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreditCard from 'src/credit-card/credit-card.entity';
import { CreditCardService } from 'src/credit-card/credit-card.service';
import { Solicitation } from 'src/credit-card/solicitations.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { BillController } from './bill.controller';
import Bill from './bill.entity';
import { BillService } from './bill.service';
import BillTask from './bill.task';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, User, CreditCard, Solicitation])],
  controllers: [BillController],
  providers: [BillService, BillTask, UserService, CreditCardService],
})
export class BillModule {}
