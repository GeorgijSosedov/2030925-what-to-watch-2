import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose'
import { User } from '../types/users.js'

export class UserEntity extends defaultClasses.TimeStamps implements User {
@prop({unique: true, required: true})
public mail !: string
@prop()
public avatar!: string
@prop()
public name!: string
@prop()
public password!: string
}

export const UserModel = getModelForClass(UserEntity)