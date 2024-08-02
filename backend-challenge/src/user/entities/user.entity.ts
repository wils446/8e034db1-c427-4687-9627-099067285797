import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../database/base.entity';
import { Task } from '../../task/entities';

@Entity()
export class User extends Base {
  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.author)
  tasks: Task[];
}
