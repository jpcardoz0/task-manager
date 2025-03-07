import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty({ message: 'O título da tarefa é obrigatório.'})
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    desc: string;
}