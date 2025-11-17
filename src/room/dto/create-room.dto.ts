import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsOptional()
  capacidade?: number;

  @IsString()
  @IsOptional()
  localizacao?: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}
