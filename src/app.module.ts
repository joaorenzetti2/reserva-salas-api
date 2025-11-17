import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/reserva_salas'),
    RoomModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
