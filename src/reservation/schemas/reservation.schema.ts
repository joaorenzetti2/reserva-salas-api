import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
  @Prop({ type: Types.ObjectId, ref: 'Room' })
  roomId: Types.ObjectId;

  @Prop()
  dataInicio: Date;

  @Prop()
  dataFim: Date;

  @Prop()
  requesterName: string;

  @Prop()
  motivo: string;

  @Prop()
  cancelado: boolean;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
