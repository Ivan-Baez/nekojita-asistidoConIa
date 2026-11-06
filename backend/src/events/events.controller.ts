import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { JwtPayload } from '../auth/strategy/jwt.strategy.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { EventsService } from './events.service.js';

type AuthedRequest = Request & { user: JwtPayload };

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // 1. CREAR UN RECITAL CON TODAS SUS FOTOS EN LA GALERÍA
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (
          _req: Request,
          file: { originalname: string },
          callback: (error: Error | null, filename: string) => void,
        ) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `show-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() createEventDto: CreateEventDto,
    @Req() req: AuthedRequest,
    @UploadedFiles() files?: UploadedFile[],
  ) {
    const uploadedUrls = files?.map((f) => `/uploads/${f.filename}`) || [];

    const existingUrls =
      createEventDto.imageUrls || (createEventDto.imageUrl ? [createEventDto.imageUrl] : []);
    const allImageUrls = [...existingUrls, ...uploadedUrls];

    // Codificar la lista completa de imágenes como JSON String para la DB
    const jsonPhotos = JSON.stringify(allImageUrls);

    return this.eventsService.create(
      {
        ...createEventDto,
        imageUrl: jsonPhotos,
        imageUrls: allImageUrls,
      },
      req.user.sub,
    );
  }

  // 2. OBTENER TODOS LOS EVENTOS Y SUS GALERÍAS
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  // 3. ELIMINAR UN EVENTO COMPLETO POR SU ID
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  // 4. AGREGAR FOTOS ADICIONALES A UN RECITAL EXISTENTE
  @UseGuards(JwtAuthGuard)
  @Post(':id/photos')
  @HttpCode(200)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (
          _req: Request,
          file: { originalname: string },
          callback: (error: Error | null, filename: string) => void,
        ) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `show-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async addPhotos(
    @Param('id') id: string,
    @UploadedFiles() files?: UploadedFile[],
  ) {
    const newUploadedUrls = files?.map((f) => `/uploads/${f.filename}`) || [];
    return this.eventsService.addPhotos(id, newUploadedUrls);
  }
}
