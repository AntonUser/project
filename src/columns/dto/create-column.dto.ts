import { IsNotEmpty } from "class-validator";

export class CreateColumnDto {
    @IsNotEmpty()
    userId: number;
    
    name: string;
}