import typegoose,{ defaultClasses, getModelForClass } from '@typegoose/typegoose'
import { User } from '../../types/users.js'
import { createSHA256 } from '../../utils/sha256.js'

const {prop, modelOptions} = typegoose

export interface UserEntity extends defaultClasses.Base{}

@modelOptions({
    schemaOptions: {
        collection: 'users'
    }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
    constructor(data: User) {
        super();
        
        this.mail = data.mail;
        this.avatar = data.avatar;
        this.name = data.name;

    }
@prop({unique: true, required: true})
public mail !: string
@prop({required: true,default: ''})
public avatar!: string
@prop({required: true,default: ''})
public name!: string
@prop({required: true,default: ''})
private password!: string

public setPassword(password: string,salt: string) {
    this.password = createSHA256(password,salt)
}

public getPassword() {
    this.password
}

public verifyPassword(password: string, salt: string) {
const hashPassword = createSHA256(password,salt)
    return hashPassword === this.password
}
}

export const UserModel = getModelForClass(UserEntity)