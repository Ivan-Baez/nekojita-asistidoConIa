import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { JwtPayload } from '../auth/strategy/jwt.strategy.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { EventsService } from './events.service.js';

type AuthedRequest = Request & { user: JwtPayload };

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createEventDto: CreateEventDto, @Req() req: AuthedRequest) {
    return this.eventsService.create(createEventDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
}
