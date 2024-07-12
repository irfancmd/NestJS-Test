import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index(['name', 'type']) // A composite index will be created for "name" and "type".
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  @Index() // A simple index will be created for "name".
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
