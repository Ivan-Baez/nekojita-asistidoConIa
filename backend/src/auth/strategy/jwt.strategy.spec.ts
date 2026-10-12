import { ConfigService } from '@nestjs/config';
import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { JwtStrategy, type JwtPayload } from './jwt.strategy.js';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  const configService = {
    getOrThrow: vi.fn().mockReturnValue('secret-de-prueba'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    jwtStrategy = module.get(JwtStrategy);
  });

  it('lee el secreto desde la configuración', () => {
    expect(configService.getOrThrow).toHaveBeenCalledWith('JWT_SECRET');
  });

  it('validate devuelve el payload del token sin modificarlo', () => {
    const payload: JwtPayload = {
      sub: 'user-1',
      email: 'nflores@nekojita.com',
      role: 'ADMIN',
    };

    expect(jwtStrategy.validate(payload)).toEqual(payload);
  });
});
