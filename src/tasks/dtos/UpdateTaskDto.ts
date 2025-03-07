import { IsOptional, IsString, IsIn, IsInt } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    desc: string;

    @IsString()
    @IsOptional()
    @IsIn(['pendente', 'concluído'])
    status: string;

    @IsInt()
    @IsOptional()
    userId: string;
}