import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { PostEntity } from "./Post.entity";
import { CommentLikeEntity } from "./CommentLike.entity";
export declare class PostCommentEntity extends BaseEntity {
    id: number;
    content: string;
    userId: number;
    user: UserEntity;
    postId: number;
    post: PostEntity;
    parentCommentId: number;
    parentComment: PostCommentEntity;
    replies: PostCommentEntity[];
    likes: CommentLikeEntity[];
    replyCount: number;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
}
