import {
  Body,
  Controller,
  // Get,
  HttpCode,
  HttpStatus,
  Post,
  // Request,
  // UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginSchoolDto } from './auth.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginSchoolDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
