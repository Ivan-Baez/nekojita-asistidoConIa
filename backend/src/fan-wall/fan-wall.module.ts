import { Module } from '@nestjs/common';
import { FanWallController } from './fan-wall.controller.js';
import { FanWallService } from './fan-wall.service.js';

@Module({
  controllers: [FanWallController],
  providers: [FanWallService],
  exports: [FanWallService],
})
export class FanWallModule {}
