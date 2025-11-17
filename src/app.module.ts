import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [RoomModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
