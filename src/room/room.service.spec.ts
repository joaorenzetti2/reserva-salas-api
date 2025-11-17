import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Room } from './schemas/room.schema';
import { RoomService } from './room.service';

describe('RoomsService', () => {
  let service: RoomService;
  let model: Record<string, jest.Mock>;

  beforeEach(async () => {
    const mockRoomModel = {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        { provide: getModelToken(Room.name), useValue: mockRoomModel },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
    model = module.get(getModelToken(Room.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all rooms', async () => {
    model.find.mockReturnValue({ exec: () => ['room1', 'room2'] });

    const result = await service.findAll();
    expect(result.length).toBe(2);
  });

  it('should throw error when room not found by id', async () => {
    model.findById.mockReturnValue({ exec: () => null });

    await expect(service.findOne('123')).rejects.toThrow(
      'Sala não encontrada.',
    );
  });
});
