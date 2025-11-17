import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop()
  nome: string;

  @Prop()
  capacidade: number;

  @Prop()
  localizacao: string;

  @Prop()
  descricao: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
