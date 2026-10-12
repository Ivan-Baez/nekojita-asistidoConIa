import { type INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { type App } from 'supertest/types';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

const ADMIN_EMAIL = 'nflores@nekojita.com';
const ADMIN_PASSWORD = 'nekojita2024';

describe('Auth y Events (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.carouselEvent.deleteMany({
      where: { eventName: 'Evento e2e' },
    });
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('devuelve un accessToken con credenciales válidas', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        .expect(201);

      expect(response.body.accessToken).toEqual(expect.any(String));
      expect(response.body.user).toEqual({
        id: expect.any(String),
        email: ADMIN_EMAIL,
        role: 'ADMIN',
      });

      token = response.body.accessToken;
    });

    it('responde 401 con contraseña incorrecta', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: ADMIN_EMAIL, password: 'clave-totalmente-mala' })
        .expect(401);
    });

    it('responde 401 con email inexistente', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nadie@nekojita.com', password: ADMIN_PASSWORD })
        .expect(401);
    });

    it('responde 400 con un body inválido', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'no-es-email', password: '123' })
        .expect(400);
    });
  });

  describe('GET /auth/profile', () => {
    it('responde 401 sin token', async () => {
      await request(app.getHttpServer()).get('/auth/profile').expect(401);
    });

    it('devuelve el payload con un token válido', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toMatchObject({
        email: ADMIN_EMAIL,
        role: 'ADMIN',
        sub: expect.any(String),
      });
    });
  });

  describe('GET /events', () => {
    it('es público y responde una lista', async () => {
      const response = await request(app.getHttpServer())
        .get('/events')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /events', () => {
    it('responde 401 sin token', async () => {
      await request(app.getHttpServer())
        .post('/events')
        .send({ eventName: 'Evento e2e', eventDate: '2027-12-31' })
        .expect(401);
    });

    it('crea el evento con token válido y lo lista ordenado por fecha', async () => {
      const created = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          eventName: 'Evento e2e',
          eventDate: '2027-12-31',
          message: 'Creado por el test e2e',
        })
        .expect(201);

      expect(created.body).toMatchObject({
        id: expect.any(String),
        eventName: 'Evento e2e',
        message: 'Creado por el test e2e',
      });

      const list = await request(app.getHttpServer())
        .get('/events')
        .expect(200);

      const names = (list.body as Array<{ eventName: string }>).map(
        (event) => event.eventName,
      );
      expect(names).toContain('Evento e2e');
    });

    it('responde 400 con datos inválidos', async () => {
      await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({ eventName: 'x', eventDate: 'no-es-fecha' })
        .expect(400);
    });
  });
});
