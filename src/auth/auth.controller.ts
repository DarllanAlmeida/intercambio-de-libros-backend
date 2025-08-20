import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint para login usando LocalStrategy
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // req.user fue seteado por LocalStrategy.validate()
    return this.authService.login(req.user);
  }

  // Endpoint para registro de usuarios
  @Post('register')
  async register(@Body() userData: any) {
    return this.authService.register(userData);
  }

  // Endpoint para obtener el perfil del usuario autenticado
  @UseGuards(JwtAuthGuard)  // JwtAuthGuard valida el token JWT
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
