import { DocumentType } from '@typegoose/typegoose/lib/types.js';
import CreateCommentDTO from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentServiceInterface {
    create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>>
    findById(commentId: string): Promise<DocumentType<CommentEntity> | null>
}
