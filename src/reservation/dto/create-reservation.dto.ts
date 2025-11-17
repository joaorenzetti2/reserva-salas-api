import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateReservationDto {
  @IsMongoId()
  @IsNotEmpty()
  roomId: Types.ObjectId;

  @IsDate()
  @IsNotEmpty()
  dataInicio: Date;

  @IsDate()
  @IsNotEmpty()
  dataFim: Date;

  @IsString()
  @IsNotEmpty()
  requesterName: string;

  @IsString()
  @IsOptional()
  motivo?: string;

  @IsOptional()
  cancelado?: boolean;
}
