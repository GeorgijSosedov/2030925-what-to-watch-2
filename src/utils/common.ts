import { Film } from '../types/films.js'

export const createFilm = (row: string) => {
const tokens = row.replace('/n', '').split('/t')
const [title,description,date,genre,release,rating,preview,video,actors,producer,
length,comments,poster,background,color,name,mail,avatar,password,
] = tokens

return {
    title,
    description,
    date: new Date(date),
    genre,
    release,
    rating,
    preview,
    video,
    actors,
    producer,
    length,
    comments,
    poster,
    background,
    color,
    user: {name,mail,avatar,password},
} as Film
}