import { Injectable } from '@nestjs/common';
import type { CarouselEvent } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateEventDto } from './dto/create-event.dto.js';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateEventDto, createdById: string): Promise<CarouselEvent> {
    return this.prisma.carouselEvent.create({
      data: {
        eventName: dto.eventName,
        eventDate: new Date(dto.eventDate),
        message: dto.message,
        imageUrl: dto.imageUrl,
        createdById,
      },
    });
  }

  findAll(): Promise<CarouselEvent[]> {
    return this.prisma.carouselEvent.findMany({
      orderBy: { eventDate: 'asc' },
    });
  }
}
