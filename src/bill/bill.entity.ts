import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BillStatus from './enum/bill-status.enum';

@Entity()
class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 0 })
  amount: number;

  @Column({ type: 'float', default: 0 })
  minimal: number;

  @Column({ default: BillStatus.WAITING_PAYMENT })
  status: BillStatus;

  @Column({ type: 'timestamp', nullable: true })
  paidDate: string;

  @Column({ type: 'timestamp' })
  dueDate: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: string;

  @JoinColumn()
  @ManyToOne(() => User)
  user: User;
}

export default Bill;
