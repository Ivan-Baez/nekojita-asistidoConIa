import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from './app.module.js';
import { PrismaService } from './prisma/prisma.service.js';

interface SeedAccount {
  email: string;
  password: string;
}

const BAND_MEMBERS: SeedAccount[] = [
  { email: 'nflores@nekojita.com', password: 'nekojita2024' },
  { email: 'nlucero@nekojita.com', password: 'nekojita2024' },
  { email: 'ncastro@nekojita.com', password: 'nekojita2024' },
  { email: 'jblengini@nekojita.com', password: 'nekojita2024' },
];

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const prisma = app.get(PrismaService);

  try {
    for (const member of BAND_MEMBERS) {
      const passwordHash = await bcrypt.hash(member.password, 10);

      await prisma.user.upsert({
        where: { email: member.email },
        update: {},
        create: { email: member.email, passwordHash },
      });

      console.log(`Cuenta lista: ${member.email}`);
    }
  } finally {
    await app.close();
  }
}

await bootstrap();
