import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class AuthService {
  constructor(
    private schoolService: SchoolService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const school = await this.schoolService.getAllSchools(1, 2, email);

    if (!school[0]) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Use bcrypt to compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(pass, school[0].password);

    if (!isPasswordValid || school.length > 1) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: school[0].id,
      name: school[0].name,
      email: school[0].email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
      }),
    };
  }
}
