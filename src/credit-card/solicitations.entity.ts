import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SolicitationStatus from './enum/solicitation-status.enum';

@Entity()
export class Solicitation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ default: SolicitationStatus.DENIED })
  status: SolicitationStatus;

  @Column()
  preferredDueDay: number;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
