import { Injectable } from '@nestjs/common';
import { Card } from '../users/entities/card.entity';
import { CreateCardDto } from '../users/dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
    async create(createCardDto: CreateCardDto) {
        return Card.create(createCardDto);
    }

    async update(updateCardDto: UpdateCardDto, id: number) {
        delete updateCardDto.cardId;
        return Card.update(id, updateCardDto);
    }

    async delete(id: number) {
        return Card.delete(id);
    }

    async get(id: number) {
        return Card.findOne(id);
    }

    async getAll() {
        return Card.find();
    }
}
