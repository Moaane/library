import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto, description: 'User registration request' })
  @ApiResponse({ status: 201, description: 'User successfully registered', type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    try {
      const existingUser = await this.userService.checkIfUserExists(registerDto.username)

      if (existingUser) {
        throw new BadRequestException('Username already in use')
      }

      if (registerDto.password.length < 6) {
        throw new BadRequestException('Password must be 6 characters or more')
      }

      return await this.authService.register(registerDto)
    } catch (error) {
      throw new BadRequestException('Registration failed')
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto, description: 'User login request' })
  @ApiResponse({ status: 200, description: 'User successfully login' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }
}
