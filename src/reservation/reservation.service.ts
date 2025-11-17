import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room, RoomDocument } from 'src/room/schemas/room.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,

    @InjectModel(Room.name)
    private roomModel: Model<RoomDocument>,
  ) {}

  async checkAvailable(
    roomId: Types.ObjectId | string,
    dataInicio: Date,
    dataFim: Date,
  ): Promise<boolean> {
    const conflict = await this.reservationModel.findOne({
      roomId,
      cancelado: false,
      dataInicio: { $lt: dataFim }, //
      dataFim: { $gt: dataInicio },
    });

    return !conflict;
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const { roomId, dataInicio, dataFim } = createReservationDto;

    const room = await this.roomModel.findById(roomId).exec();
    if (!room) {
      throw new NotFoundException('Sala não encontrada');
    }

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    if (inicio >= fim) {
      throw new BadRequestException('dataInicio deve vir antes do dataFim');
    }

    const disponivel = await this.checkAvailable(roomId, inicio, fim);
    if (!disponivel) {
      throw new BadRequestException(
        'Sala não está disponível para esse horario',
      );
    }

    const created = new this.reservationModel({
      ...createReservationDto,
      dataInicio: inicio,
      dataFim: fim,
    });

    return created.save();
  }

  async findByRoom(roomId: string) {
    return this.reservationModel
      .find({ roomId, cancelado: false })
      .sort({ dataInicio: 1 })
      .exec();
  }

  async findByDate(roomId: string, date: string) {
    const selectedDate = new Date(date);
    const proxDia = new Date(selectedDate);

    proxDia.setDate(selectedDate.getDate() + 1);

    return this.reservationModel
      .find({
        roomId,
        cancelado: false,
        dataInicio: { $gte: selectedDate },
        dataFim: { $lt: proxDia },
      })
      .sort({ dataInicio: 1 })
      .exec();
  }

  async findOne(id: string) {
    const reservation = await this.reservationModel.findById(id).exec();
    if (!reservation) {
      throw new NotFoundException('Reserva não encontrada');
    }

    return reservation;
  }

  async cancel(id: string) {
    const reservation = await this.reservationModel
      .findByIdAndUpdate(id, { cancelado: true }, { new: true })
      .exec();

    if (!reservation) {
      throw new NotFoundException('Reserva não encontrada');
    }

    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const updatedRes = await this.reservationModel.findByIdAndUpdate(
      id,
      updateReservationDto,
      { new: true },
    );
    if (!updatedRes) {
      throw new NotFoundException('Reserva não encontrada');
    }

    return updatedRes;
  }

  async delete(id: string) {
    const deletedRes = await this.reservationModel.findByIdAndDelete(id).exec();

    if (!deletedRes) {
      throw new NotFoundException('Reserva não encontrada');
    }
  }
}
