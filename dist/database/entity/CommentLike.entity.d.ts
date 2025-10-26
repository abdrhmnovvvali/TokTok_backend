import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { PostCommentEntity } from "./PostComment.entity";
export declare class CommentLikeEntity extends BaseEntity {
    id: number;
    userId: number;
    user: UserEntity;
    commentId: number;
    comment: PostCommentEntity;
    createdAt: Date;
}
