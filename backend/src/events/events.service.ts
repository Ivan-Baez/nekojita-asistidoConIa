import { Injectable, NotFoundException } from '@nestjs/common';
import type { CarouselEvent } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateEventDto } from './dto/create-event.dto.js';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventDto, createdById: string): Promise<CarouselEvent> {
    // Si vienen varias fotos (imageUrls), las guardamos como JSON en la columna imageUrl
    const imagesToSave =
      dto.imageUrls && dto.imageUrls.length > 0
        ? JSON.stringify(dto.imageUrls)
        : dto.imageUrl;

    return this.prisma.carouselEvent.create({
      data: {
        eventName: dto.eventName,
        eventDate: new Date(dto.eventDate),
        message: dto.message,
        imageUrl: imagesToSave,
        createdById,
      },
    });
  }

  async findAll(): Promise<any[]> {
    const events = await this.prisma.carouselEvent.findMany({
      orderBy: { eventDate: 'asc' },
    });

    // Decodifica las imágenes para que el Frontend reciba el arreglo imageUrls
    return events.map((event) => {
      let imageUrls: string[] = [];
      if (event.imageUrl) {
        try {
          if (event.imageUrl.startsWith('[')) {
            imageUrls = JSON.parse(event.imageUrl);
          } else {
            imageUrls = [event.imageUrl];
          }
        } catch {
          imageUrls = [event.imageUrl];
        }
      }

      return {
        ...event,
        imageUrls,
      };
    });
  }

  async remove(id: string): Promise<CarouselEvent> {
    const existing = await this.prisma.carouselEvent.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Evento no encontrado');
    }

    return this.prisma.carouselEvent.delete({
      where: { id },
    });
  }

  async addPhotos(id: string, newPhotoUrls: string[]): Promise<any> {
    const event = await this.prisma.carouselEvent.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }

    let currentUrls: string[] = [];
    if (event.imageUrl) {
      try {
        if (event.imageUrl.startsWith('[')) {
          currentUrls = JSON.parse(event.imageUrl);
        } else {
          currentUrls = [event.imageUrl];
        }
      } catch {
        currentUrls = [event.imageUrl];
      }
    }

    const updatedUrls = [...currentUrls, ...newPhotoUrls];

    const updated = await this.prisma.carouselEvent.update({
      where: { id },
      data: {
        imageUrl: JSON.stringify(updatedUrls),
      },
    });

    return {
      ...updated,
      imageUrls: updatedUrls,
    };
  }
}
