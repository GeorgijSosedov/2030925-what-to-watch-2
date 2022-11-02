import { User } from './users.js';
import { Genre } from './genres-type.js';

export type Film = {
title: string
description: string
date: Date
genre: Genre
release: string
rating: string
preview: string,
video: string,
actors: string
producer: string
length: string
commentsCount: number
user: User
poster: string
background: string
color: string
}
