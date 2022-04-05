import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card.entity";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(() => Card, card => card.id)
    @JoinColumn({ name: 'card_id', referencedColumnName: 'id' })
    card: Card;
}