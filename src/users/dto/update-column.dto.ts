import { IsNotEmpty } from "class-validator";

export class UpdateColumnDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;
}