import { All, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Column } from 'typeorm';
import { ColumnEntity } from '../users/entities/column.entity';
import { CreateColumnDto } from '../users/dto/create-column.dto';
import { UpdateColumnDto } from '../users/dto/update-column.dto';

@Injectable()
export class ColumnsService {

    // async create(createColumnDto: CreateColumnDto) {
    //     const usersService = new UsersService();
    //     const user = await usersService.findById(createColumnDto.userId);
    //     const column_en = ColumnEntity.create();
    //     column_en.name = createColumnDto.name;
    //     column_en.user = user;
    //     await column_en.save();
    //     delete column_en.user
    //     return column_en;
    // }

    async update(updateColumnDto: UpdateColumnDto, id: number) {
        delete updateColumnDto.id;
        return await ColumnEntity.update(id, updateColumnDto);
    }

    async delete(id: number) {
        return await ColumnEntity.delete(id);
    }

    async get(id: number) {
        return await ColumnEntity.findOne(id, {
            select: ['id', 'name'],
            where: { id: id },
            relations: ['cards']
        });
    }
    async getAll() {
        return await ColumnEntity.find();
    }

}
