/*import mongoose from "mongoose";
import { User } from "../types/users";

export interface UserDocument extends User, mongoose.Document {
    createAd: Date
    updatedAd: Date
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Неправильно введён e-mail'],
        required: true
    },
    avatarPath: {
        type: String,
        required: true,
        minLength: [5, 'Минимальная длина - 5 символов'],
    },
    firstName:{
        type: String,
        required: true,
        minLength: [2,'Минимальная длина - 2 символа']
    },
    lastName: String
}, {
    timestamps: true
})

export const UserModel = mongoose.model<UserDocument>('User',userSchema)
*/