import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReservationDto {
  @IsMongoId()
  @IsNotEmpty()
  roomId: string;

  @IsDate()
  @IsNotEmpty()
  dataInicio: string;

  @IsDate()
  @IsNotEmpty()
  dataFim: string;

  @IsString()
  @IsNotEmpty()
  requesterName: string;

  @IsString()
  @IsOptional()
  motivo?: string;
}
