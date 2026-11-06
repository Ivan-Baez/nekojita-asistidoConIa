import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateMessageDto } from './dto/create-message.dto.js';
import { FanWallService } from './fan-wall.service.js';

const DTO: CreateMessageDto = {
  author: 'Nico',
  message: '¡Que sea rock! Tremendo el show en Mendoza 🔥',
};

const CREATED_MESSAGE = {
  id: 1,
  author: DTO.author,
  message: DTO.message,
  createdAt: new Date(),
};

describe('FanWallService', () => {
  let fanWallService: FanWallService;

  const prisma = {
    fanWallMessage: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    prisma.fanWallMessage.create.mockResolvedValue(CREATED_MESSAGE);
    prisma.fanWallMessage.findMany.mockResolvedValue([CREATED_MESSAGE]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FanWallService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    fanWallService = module.get(FanWallService);
  });

  describe('create', () => {
    it('crea el mensaje con el autor y el texto indicados', async () => {
      const result = await fanWallService.create(DTO);

      expect(prisma.fanWallMessage.create).toHaveBeenCalledWith({
        data: {
          author: 'Nico',
          message: '¡Que sea rock! Tremendo el show en Mendoza 🔥',
        },
      });
      expect(result).toEqual(CREATED_MESSAGE);
    });
  });

  describe('findAll', () => {
    it('consulta los mensajes ordenados por fecha descendente', async () => {
      const result = await fanWallService.findAll();

      expect(prisma.fanWallMessage.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toEqual([CREATED_MESSAGE]);
    });
  });
});
