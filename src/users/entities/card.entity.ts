import { ColumnEntity } from "src/users/entities/column.entity";
import { Comment } from "./comment.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(() => ColumnEntity, column => column.id)
    @JoinColumn({ name: 'column_id', referencedColumnName: 'id' })
    columnEntity: ColumnEntity;

    @OneToMany(() => Comment, comment => comment.card)
    comments: Comment[];
}