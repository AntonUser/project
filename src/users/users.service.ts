import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ColumnEntity } from 'src/users/entities/column.entity';
import { UpdateColumnDto } from './dto/update-column.dto';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from 'src/users/entities/card.entity';


@Injectable()
export class UsersService {
    async createUser(createUserDto: CreateUserDto) {
        const user = User.create(createUserDto);
        const userResp = await user.save();

        delete userResp.password;
        return userResp;
    }

    async createColumn(createColumnDto: CreateColumnDto, id: number) {
        const user = await this.getUser(id);
        const column_en = ColumnEntity.create();
        column_en.name = createColumnDto.name;
        column_en.user = user;
        await column_en.save();
        delete column_en.user
        return column_en;
    }

    async createCard(createCardDto: CreateCardDto, idColumn: number, idUser: number) {
        const card = Card.create();

        let columns = await (await this.getUser(idUser)).columns
        let columnEntity;

        columns.forEach((column: ColumnEntity) => {
            if (column.id === idColumn) {
                columnEntity = column;
            }
        })

        if (columnEntity === undefined) {
            throw new ForbiddenException();
        }

        card.value = createCardDto.value;
        card.columnEntity = columnEntity;

        return await Card.save(card);
    }

    async showUserById(id: number): Promise<User> {
        const user = await this.getUser(id);
        delete user.password;
        return user;
    }

    async getUser(id: number) {
        const user = await User.findOne(id, {
            select: ['id', 'email', 'password', 'userName'],
            where: { id: id },
            relations: ['columns', 'columns.cards', 'columns.cards.comments']
        });

        return await user;
    }

    async findByEmail(email: string) {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    }

    //?
    // async updateUser(updateUserDto: UpdateUserDto, id: number) {
    //     const updateData = {
    //         userName: updateUserDto.userName,
    //         email: updateUserDto.email,
    //         password: await bcrypt.hash(updateUserDto.password, 8),
    //     };

    //     if (typeof updateData.userName == null) {
    //         delete updateData.userName;
    //     }

    //     if (typeof updateData.email == null) {
    //         delete updateData.email;
    //     }

    //     if (typeof updateData.password == null) {
    //         delete updateData.password;
    //     }

    //     return await User.update({ id }, updateData);
    // }

    async updateСolumn(updateColumnDto: UpdateColumnDto, id: number) {
        delete updateColumnDto.id;
        return await ColumnEntity.update(id, updateColumnDto);
    }

    async deleteUser(id: string) {
        return await User.delete(id);
    }
}

