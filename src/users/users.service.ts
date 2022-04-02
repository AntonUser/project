import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
        const user = User.create(createUserDto);
        await user.save();

        delete user.password;
        return user;
    }

    async showById(id: number): Promise<User> {
        const user = await this.findById(id);

        delete user.password;
        return user;
    }

    async findById(id: number) {
        return await User.findOne(id);
    }

    async findByEmail(email: string) {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    }

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

//     async addColumn(idUser: string) {
//    //     return await User.
//     }

    async deleteUser(id: string) {
        return await User.delete(id);
    }
}
