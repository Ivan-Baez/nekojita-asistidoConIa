import { Injectable } from '@nestjs/common';
import type { FanWallMessage } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateMessageDto } from './dto/create-message.dto.js';

@Injectable()
export class FanWallService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMessageDto): Promise<FanWallMessage> {
    return this.prisma.fanWallMessage.create({
      data: {
        author: dto.author,
        message: dto.message,
      },
    });
  }

  findAll(): Promise<FanWallMessage[]> {
    return this.prisma.fanWallMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
