import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, type TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UsersService } from '../users/users.service.js';
import { AuthService } from './auth.service.js';
import type { LoginDto } from './dto/login.dto.js';

const USER = {
  id: 'user-1',
  email: 'nflores@nekojita.com',
  passwordHash: '',
  role: 'ADMIN' as const,
  createdAt: new Date(),
};

const LOGIN_DTO: LoginDto = {
  email: USER.email,
  password: 'nekojita2024',
};

describe('AuthService', () => {
  let authService: AuthService;

  const usersService = {
    findByEmail: vi.fn(),
    findById: vi.fn(),
  };

  const jwtService = {
    signAsync: vi.fn(),
  };

  beforeEach(async () => {
    USER.passwordHash = await bcrypt.hash('nekojita2024', 4);

    vi.clearAllMocks();
    jwtService.signAsync.mockResolvedValue('jwt-token');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  describe('login', () => {
    it('devuelve accessToken y usuario sin passwordHash con credenciales válidas', async () => {
      usersService.findByEmail.mockResolvedValue({ ...USER });

      const result = await authService.login(LOGIN_DTO);

      expect(result.accessToken).toBe('jwt-token');
      expect(result.user).toEqual({
        id: USER.id,
        email: USER.email,
        role: USER.role,
      });
      expect(result.user).not.toHaveProperty('passwordHash');
    });

    it('firma el token con sub, email y role', async () => {
      usersService.findByEmail.mockResolvedValue({ ...USER });

      await authService.login(LOGIN_DTO);

      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: USER.id,
        email: USER.email,
        role: USER.role,
      });
    });

    it('lanza UnauthorizedException con contraseña incorrecta', async () => {
      usersService.findByEmail.mockResolvedValue({ ...USER });

      await expect(
        authService.login({ ...LOGIN_DTO, password: 'clave-mala-123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('lanza UnauthorizedException con email inexistente', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(authService.login(LOGIN_DTO)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
