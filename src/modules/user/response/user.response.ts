import { Expose } from "class-transformer";

export default class UserResponse {
    @Expose()
    public mail!: string

    @Expose()
    public avatar!: string

    @Expose()
    public name!: string

    @Expose()
    public password!: string
}