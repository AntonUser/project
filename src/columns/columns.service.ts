import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ColumnEntity } from './column.entity';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnsService {
    async create(createColumnDto: CreateColumnDto) {
        const usersService = new UsersService();
        const user = await usersService.findById(createColumnDto.userId);
        const column_en = ColumnEntity.create();
        column_en.name = createColumnDto.name;
        column_en.user = user;
        await column_en.save();
        delete column_en.user
        return column_en;
    }
}
