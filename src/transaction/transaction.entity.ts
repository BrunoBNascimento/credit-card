import Bill from 'src/bill/bill.entity';
import CreditCard from 'src/credit-card/credit-card.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import TransactionStatus from './enum/transaction-status.enum';

@Entity()
class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: true })
  date: Date;

  @Column({ type: 'float' })
  value: number;

  @Column({ default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @JoinColumn()
  @ManyToOne(() => CreditCard)
  credit_card: CreditCard;

  @JoinColumn()
  @ManyToOne(() => Bill)
  bill: Bill;

  @JoinColumn()
  @ManyToOne(() => User)
  user: User;
}

export default Transaction;
