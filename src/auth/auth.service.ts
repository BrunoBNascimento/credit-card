import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async login(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email)

        console.log(user);

        if (!user) {
            throw new UnauthorizedException();
        }

        const match = await bcrypt.compare(password, user.password)

        if(match) {
            const payload = { email, sub: user.id }

            return {
                token: this.jwtService.sign(payload)
            }
        } else {
            throw new UnauthorizedException();
        }
    }
}
