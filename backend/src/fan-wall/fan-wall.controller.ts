import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { FanWallService } from './fan-wall.service.js';

@Controller('fan-wall')
export class FanWallController {
  constructor(private readonly fanWallService: FanWallService) {}

  @Get()
  findAll() {
    return this.fanWallService.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.fanWallService.create(createMessageDto);
  }
}
