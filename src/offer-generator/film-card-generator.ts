
import dayjs from "dayjs";
import { generateRandomValue, getRandomItem } from "../utils/random.js";
import { MockData } from "../types/mock-data.type";
import { FilmGeneratorInterface } from "./film-generator.interface";

const FIRST_WEEK_DAY = 1
const LAST_WEEK_DAY = 7

export default class FilmCardGenerator implements FilmGeneratorInterface {
constructor(private readonly mockData: MockData) {}

public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles)
    const description = getRandomItem<string>(this.mockData.descriptions)
    const genre = getRandomItem<string>(this.mockData.genres)
    const release = getRandomItem<number>(this.mockData.releases)
    const rating = getRandomItem<number>(this.mockData.ratings)
    const preview = getRandomItem<string>(this.mockData.previews)
    const video = getRandomItem<string>(this.mockData.videos)
    const actor = getRandomItem<string>(this.mockData.actors)
    const producer = getRandomItem<string>(this.mockData.producers)
    const length = getRandomItem<number>(this.mockData.lengths)
    const comment = getRandomItem<number>(this.mockData.comments)
    const user = getRandomItem<string>(this.mockData.users)
    const poster = getRandomItem<string>(this.mockData.posters)
    const background = getRandomItem<string>(this.mockData.backgrounds)
    const color = getRandomItem<string>(this.mockData.colors)
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY,LAST_WEEK_DAY), 'day').toISOString()

const [firstname, lastname] = user.split(' ');




return [
    title,description,genre,release,
    rating,preview,video,actor,producer,
    length,comment,firstname,lastname,
    poster,background,color,createdDate
       ].join('\t')
    }
}