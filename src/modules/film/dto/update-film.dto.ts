import { Genre } from "../../../types/genres-type"

export default class UpdateFilmDTO {
public title?: string
public description?: string
public date?: Date
public genre?: Genre
public release?: string
public preview?: string
public video?: string
public actors?: string
public producer?: string
public length?: string
public user?: string
public poster?: string
public background?: string
public color?: string
}
