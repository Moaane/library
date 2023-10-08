import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, response } from 'express';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('validate')
  async validateUser(@Res() response: Response, @Body() authDto: AuthDto) {
    return await this.authService.validateUser(authDto, response)
  }

  @Post('register')
  async register(@Res() response: Response, @Body() authDto: AuthDto) {
    return await this.authService.register(authDto, response)
  }

  @Post('login')
  async login(@Res() response: Response, @Body() authDto: AuthDto) {
    return await this.authService.login(authDto, response)
  }
}
