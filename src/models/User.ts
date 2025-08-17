import {model, Schema} from 'mongoose'

export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client'
}

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CLIENT,
        }
    }, {timestamps: true}   
)

export const UserModel = model('User', userSchema)