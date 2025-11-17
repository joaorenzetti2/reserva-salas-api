import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { getModelToken } from '@nestjs/mongoose';
import { Reservation } from './schemas/reservation.schema';
import { Room } from '../room/schemas/room.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ReservationsService', () => {
  let service: ReservationService;
  let reservationModel: jest.Mocked<typeof mockReservationModel>;
  let roomModel: jest.Mocked<typeof mockRoomModel>;

  const mockReservationModel = {
    findOne: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const mockRoomModel = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getModelToken(Reservation.name),
          useValue: mockReservationModel,
        },
        {
          provide: getModelToken(Room.name),
          useValue: mockRoomModel,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reservationModel = module.get(getModelToken(Reservation.name));
    roomModel = module.get(getModelToken(Room.name));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve lançar erro ao tentar criar reserva para sala inexistente', async () => {
    roomModel.findById.mockReturnValue({ exec: () => null });

    await expect(
      service.create({
        roomId: '123',
        dataInicio: new Date().toISOString(),
        dataFim: new Date(Date.now() + 3600000).toISOString(),
        requesterName: 'João',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('deve lançar erro quando dataInicio for maior ou igual a dataFim', async () => {
    roomModel.findById.mockReturnValue({ exec: () => ({}) });

    const agora = new Date().toISOString();

    await expect(
      service.create({
        roomId: '123',
        dataInicio: agora,
        dataFim: agora,
        requesterName: 'Maria',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('deve detectar conflito de reserva e lançar erro', async () => {
    roomModel.findById.mockReturnValue({ exec: () => ({}) });

    reservationModel.findOne.mockReturnValue({
      exec: () => ({ _id: 'abc123' }),
    });

    await expect(
      service.create({
        roomId: '123',
        dataInicio: new Date().toISOString(),
        dataFim: new Date(Date.now() + 3600000).toISOString(),
        requesterName: 'Carlos',
      }),
    ).rejects.toThrow('Sala não está disponível para esse horario');
  });

  it('deve retornar erro ao tentar cancelar reserva inexistente', async () => {
    reservationModel.findByIdAndUpdate.mockReturnValue({
      exec: () => null,
    });

    await expect(service.cancel('123')).rejects.toThrow(NotFoundException);
  });
});
