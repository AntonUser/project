import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Card } from 'src/users/entities/card.entity';

@Entity()
export class ColumnEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
    user: User;

    @OneToMany(() => Card, card => card.columnEntity)
    cards: Card[];
}