import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto
{
    @ApiProperty({example: 'astraboy', description: 'Уникальный никнейм'})
    readonly nickname: string;
    @ApiProperty({example: 'astraboy@gmail.com', description: 'Почтовый адрес'})
    readonly email: string;
    @ApiProperty({example: 'nbvcxz', description: 'Пароль'})
    readonly password: string;
}