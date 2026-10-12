import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsService } from './events.service.js';
import type { CreateEventDto } from './dto/create-event.dto.js';

const DTO: CreateEventDto = {
  eventName: 'Rottem Bar',
  eventDate: '2026-12-16',
  message: 'Godoy Cruz, Mendoza',
  imageUrl: 'https://example.com/afiche.jpg',
};

const CREATED_EVENT = {
  id: 'event-1',
  eventName: DTO.eventName,
  eventDate: new Date(DTO.eventDate),
  message: DTO.message,
  imageUrl: DTO.imageUrl,
  createdById: 'user-1',
  createdAt: new Date(),
};

describe('EventsService', () => {
  let eventsService: EventsService;

  const prisma = {
    carouselEvent: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    prisma.carouselEvent.create.mockResolvedValue(CREATED_EVENT);
    prisma.carouselEvent.findMany.mockResolvedValue([CREATED_EVENT]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    eventsService = module.get(EventsService);
  });

  describe('create', () => {
    it('crea el evento con la fecha convertida y el autor indicado', async () => {
      const result = await eventsService.create(DTO, 'user-1');

      expect(prisma.carouselEvent.create).toHaveBeenCalledWith({
        data: {
          eventName: 'Rottem Bar',
          eventDate: new Date('2026-12-16'),
          message: 'Godoy Cruz, Mendoza',
          imageUrl: 'https://example.com/afiche.jpg',
          createdById: 'user-1',
        },
      });
      expect(result).toEqual(CREATED_EVENT);
    });

    it('permite un evento sin mensaje ni imagen', async () => {
      await eventsService.create(
        { eventName: 'Ensayo', eventDate: '2027-01-01' },
        'user-1',
      );

      expect(prisma.carouselEvent.create).toHaveBeenCalledWith({
        data: {
          eventName: 'Ensayo',
          eventDate: new Date('2027-01-01'),
          message: undefined,
          imageUrl: undefined,
          createdById: 'user-1',
        },
      });
    });
  });

  describe('findAll', () => {
    it('consulta los eventos ordenados por fecha ascendente', async () => {
      const result = await eventsService.findAll();

      expect(prisma.carouselEvent.findMany).toHaveBeenCalledWith({
        orderBy: { eventDate: 'asc' },
      });
      expect(result).toEqual([CREATED_EVENT]);
    });
  });
});
