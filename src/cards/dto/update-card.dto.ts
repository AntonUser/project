import { IsNotEmpty } from "class-validator";

export class UpdateCardDto {

    @IsNotEmpty()
    cardId: number;

    value: string;
}