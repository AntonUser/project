import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ColumnEntity } from 'src/users/entities/column.entity';

@Entity()
export class User extends BaseEntity {
    [x: string]: any;

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_name' })
    userName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ColumnEntity, column => column.user)
    columns: ColumnEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}