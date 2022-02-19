import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Brands from './enum/brands.enum';

@Entity()
class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 50 })
  limit: number;

  @Column({ default: 50 })
  disponible: number;

  @Column()
  number: string;

  @Column({ default: Brands.VISA })
  brand: Brands;

  @Column({ type: 'timestamp' })
  valid_until: Date;

  @Column({ length: 3 })
  cvv: string;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}

export default CreditCard;
