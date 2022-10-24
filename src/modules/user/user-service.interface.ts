import { DocumentType } from "@typegoose/typegoose"
import CreateUserDTO from "./dto/create-user.dto.js"
import UpdateUserDTO from "./dto/update-user.dto.js"
import { UserEntity } from "./user.entity.js"

export interface UserServiceInterface {
    create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>
    findById(id:string): Promise<DocumentType<UserEntity> | null>
    findByMail(mail: string): Promise<DocumentType<UserEntity> | null>
    findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity> | null>
    update(userId: string, dto: UpdateUserDTO): Promise<DocumentType<UserEntity> | null>
}