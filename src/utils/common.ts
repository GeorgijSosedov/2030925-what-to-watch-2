import { Film } from '../types/films.js';
import { Genre } from '../types/genres-type.js';

export const createFilm = (row: string) => {
  const tokens = row.replace('/n', '').split('/t');
  const [title,description,date,genre,release,rating,preview,video,actors,producer,
    length,commentsCount,poster,background,color,name,mail,avatar,password,
  ] = tokens;

  return {
    title,
    description,
    date: new Date(date),
    genre: (genre as unknown) as Genre,
    release,
    rating,
    preview,
    video,
    actors,
    producer,
    length,
    commentsCount: Number(commentsCount),
    poster,
    background,
    color,
    user: {name,mail,avatar,password},
  } as Film;
};
