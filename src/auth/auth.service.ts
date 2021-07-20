import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService) {}
    
     async login( userDto: CreateUserDto) {
        const authUser = await this.validateUser(userDto);
        return this.generateToken(authUser);
    }

    
     async registration( userDto: CreateUserDto) {
        const checkUser = await this.userService.getUserByEmail(userDto.email);
        if (checkUser) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 7);
        const user = await this.userService.createUser({...userDto, password:hashPassword});
        return this.generateToken(user)
    }

    private async generateToken(user) {
        const payload = {nickname: user.nickname, email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({
            message: 'Некорректный email или пароль'
        })
    }
}
