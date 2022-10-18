import { User } from "../../types/users.js"

export default class CreateFilmDTO {
public title!: string
public description!: string
public date!: Date
public genre!: string
public release!: string
public rating!: string
public preview!: string
public video!: string
public actors!: string
public producer!: string
public length!: string
public comments!: number
public user!: User
public poster!: string
public background!: string
public color!: string
}