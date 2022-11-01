import { types } from "@typegoose/typegoose";
import { DocumentType } from "@typegoose/typegoose/lib/types.js";
import { inject, injectable } from "inversify";
import { LoggerInterface } from "../../logger/logger-interface.js";
import { Component } from "../../types/component.types.js";
import createCommentDto from "./dto/create-comment.dto.js";
import { CommentServiceInterface } from "./comment-service.interface.js";
import { CommentEntity } from "./comment.entity.js";

@injectable()
export default class CommentService implements CommentServiceInterface {
    constructor(
        @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
        @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
    ) {}

    public async create(dto: createCommentDto): Promise<DocumentType<CommentEntity>> {
        const result = await this.commentModel.create(dto);
        this.logger.info(`Вы добавили новый комментарий:${dto.text}!`)

        return result
    }

    public async findById(commentId: string): Promise<DocumentType<CommentEntity> | null> {
        return this.commentModel.findById(commentId).exec();
      }
}
