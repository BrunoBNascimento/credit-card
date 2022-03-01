import Transaction from 'src/transaction/transaction.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BillStatus from './enum/bill-status.enum';

@Entity()
class Bill {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dueDate: string;

  @Column({ type: 'timestamp', nullable: true })
  paidDate: string;

  @Column({ default: BillStatus.WAITING_PAYMENT })
  status: BillStatus;

  @Column()
  amount: number;

  @Column()
  minimal: number;

  @OneToMany(() => Transaction, (transaction) => transaction.bill, {
    eager: true,
    cascade: true,
  })
  transactions: Transaction[];

  @JoinColumn()
  @ManyToOne(() => User, {
    eager: true,
    cascade: true,
  })
  user: User;
}

export default Bill;
