import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get('/room/:roomId/date')
  findByDate(@Param('roomId') roomId: string, @Query('date') date: string) {
    return this.reservationService.findByDate(roomId, date);
  }

  @Get('/room/:roomId')
  findByRoom(@Param('roomId') roomId: string) {
    return this.reservationService.findByRoom(roomId);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch('/cancel/:id')
  cancel(@Param('id') id: string) {
    return this.reservationService.cancel(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.delete(id);
  }
}
