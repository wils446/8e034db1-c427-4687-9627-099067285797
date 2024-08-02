import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../database/base.entity';
import { User } from '../../user/entities';

@Entity()
export class Task extends Base {
  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Exclude()
  @Column({ type: 'uuid' })
  authorId: string;

  @ManyToOne(() => User, (user) => user.tasks)
  author: User;
}
