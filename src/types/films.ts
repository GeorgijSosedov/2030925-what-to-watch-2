import { User } from "./users"

export type Film = {
title: string
description: string
date: Date
genre: string
release: Date
rating: number
preview: string,
video: string,
actors: string
producer: string
length: number
comments: number
user: User
poster: string
background: string
color: string
}