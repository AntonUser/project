import { IsNotEmpty } from "class-validator";

export class AddColumnDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    columnName: string;
}