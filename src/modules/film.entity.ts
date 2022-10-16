import { Film } from "../types/films";
import { User } from "../types/users";

export class FilmEntity implements Film {
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
public comments!: string
public user!: User
public poster!: string
public background!: string
public color!: string
}