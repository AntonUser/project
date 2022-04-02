import { Body, Controller, Param, Post } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';

@Controller('columns')
export class ColumnsController {
    constructor(private readonly columnService: ColumnsService) { }

    @Post()
    create(@Body() createColumnDto: CreateColumnDto) {
        return this.columnService.create(createColumnDto);
    }
}
