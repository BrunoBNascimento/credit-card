import CreditCard from 'src/credit-card/credit-card.entity';
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

  @Column({ type: 'timestamp' })
  date: Date;

  @JoinColumn()
  @ManyToOne(() => CreditCard, (creditCard) => creditCard.transactions)
  credit_card: CreditCard;

  @Column()
  value: number;

  @Column({ default: TransactionStatus.PENDING })
  status: TransactionStatus;
}

export default Transaction;
