import { types } from "@typegoose/typegoose";
import { DocumentType } from "@typegoose/typegoose/lib/types.js";
import { inject, injectable } from "inversify";
import { LoggerInterface } from "../../logger/logger-interface.js";
import { Component } from "../../types/component.types.js";
import CreateUserDTO from "./dto/create-user.dto.js";
import updateUserDto from "./dto/update-user.dto.js";
import { UserServiceInterface } from "./user-service.interface.js";
import { UserEntity } from "./user.entity.js";

@injectable()
export default class UserService implements UserServiceInterface {
    constructor(
        @inject(Component.LoggerInterface) private logger : LoggerInterface,
        @inject(Component.UserModel) private readonly userModel : types.ModelType<UserEntity>
    ) {}
    
    public async create(dto: CreateUserDTO,salt: string): Promise<DocumentType<UserEntity>>{
        const user = new UserEntity(dto);
        user.setPassword(dto.password,salt)

    const result = await this.userModel.create(user)
    this.logger.info(`Создан новый пользователь!  ${user.mail}`)

    return result
    }
    
    public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
        return this.userModel.findById(userId).exec();
        }
    

    public async findByMail(mail: string): Promise<DocumentType<UserEntity> | null> {
        return this.userModel.findOne({mail});
    }

    public async findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity> | null> {
        const existedUser = this.findByMail(dto.mail);
    
    if (existedUser) {
        return existedUser;
    }

    return this.create(dto,salt)
    }

    public async update(userId: string, dto: updateUserDto): Promise<types.DocumentType<UserEntity> | null> {
        return this.userModel
        .findByIdAndUpdate(userId,dto,{new: true})
        .exec()
    }
}
