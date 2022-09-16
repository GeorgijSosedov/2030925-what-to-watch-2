import { readFileSync } from "fs";
import { FileReaderInterface } from "./file-reader-interface";

export default class FileReaderTSV implements FileReaderInterface {
    private rawData = '';

    constructor (public filename: string) {}

    public read(): void {
    this.rawData = readFileSync(this.filename,{encoding: 'utf-8'})
    }

    public toArray() {
        if (!this.rawData) {
        return [];
        };

    return this.rawData 
    .split('/n')
    .filter((row) => row.trim() !== '')
    .map((line) => line.split('/t'))
    .map(([title,description,date,genre,release,rating,preview,video,actors,producer,length,comments,user,poster,background,color,name,mail,avatar,password,text,userRating,postDate]) => 
    ({
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
comment: {text,userRating,postDate,user},
poster,
background,
color,
user: {name,mail,avatar,password},
    }));
    };
};