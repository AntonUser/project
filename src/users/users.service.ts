import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { ColumnsService } from 'src/columns/columns.service';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { AddColumnDto } from './dto/add-column.dto';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
        const user = User.create(createUserDto);
        const userResp = await user.save();

        delete userResp.password;
        return userResp;
    }

    async showById(id: number): Promise<User> {
        const user = await this.findById(id);

        delete user.password;
        return user;
    }

    async findById(id: number) {
        const user = await User.findOne(id, {
            select: ['id', 'email', 'password', 'userName'],
            where: { id: id },
            relations: ['columns']
        });

        return user;
    }

    async findByEmail(email: string) {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    }

    //?
    async updateUser(updateUserDto: UpdateUserDto, id: number) {
        const updateData = {
            userName: updateUserDto.userName,
            email: updateUserDto.email,
            password: await bcrypt.hash(updateUserDto.password, 8),
        };

        if (typeof updateData.userName == null) {
            delete updateData.userName;
        }

        if (typeof updateData.email == null) {
            delete updateData.email;
        }

        if (typeof updateData.password == null) {
            delete updateData.password;
        }

        return await User.update({ id }, updateData);
    }

    async addColumn(addColumnDto: AddColumnDto) {
        const columnService = new ColumnsService();
        const createColumnDto = new CreateColumnDto();
        createColumnDto.name = addColumnDto.columnName;
        createColumnDto.userId = addColumnDto.userId
        return columnService.create(createColumnDto);
    }

    async deleteUser(id: string) {
        return await User.delete(id);
    }

}
