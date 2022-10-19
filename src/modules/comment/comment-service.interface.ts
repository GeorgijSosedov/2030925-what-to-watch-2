import { DocumentType } from "@typegoose/typegoose/lib/types";
import CreateCommentDTO from "../dto/create-comment.dto";
import { CommentEntity } from "./comment.entity";

export interface CommentServiceInterface {
    create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>>
}