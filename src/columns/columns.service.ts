import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ColumnEntity } from './column.entity';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnsService {
    async create(createColumnDto: CreateColumnDto) {
        const usersService = new UsersService();
        const user = usersService.findById(createColumnDto.userId);
        const column_en = ColumnEntity.create({
            name: createColumnDto.name
        });
        return await column_en.save();
    }
}
