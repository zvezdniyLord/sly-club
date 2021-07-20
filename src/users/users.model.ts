import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreateAttr {
    nickname: string;
    email: string;
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreateAttr> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: 'astraboy', description: 'Уникальный никнейм'})
    @Column({type: DataType.STRING(50), unique: true, allowNull: false})
    nickname: string;
    @ApiProperty({example: 'astraboy@gmail.com', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: 'nbvcxz', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @ApiProperty({example: '03-04-1998', description: 'День рождения'})
    @Column({type: DataType.DATEONLY, allowNull: true})
    birthday: string;
    @ApiProperty({example: 'true', description: 'Забанен или нет(true-да, false-нет)'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;
    @ApiProperty({example: 'Нецензурная лексика', description: 'Причина бана'})
    @Column({type: DataType.BOOLEAN, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}