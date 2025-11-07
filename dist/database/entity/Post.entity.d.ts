import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { MediaEntity } from "./Media.entity";
import { PostActionEntity } from "./PostAction.entity";
import { PostCommentEntity } from "./PostComment.entity";
export declare class PostEntity extends BaseEntity {
    id: number;
    content: string;
    isActive: boolean;
    userId: number;
    like: number;
    view: number;
    isLike: boolean;
    commentCount: number;
    shared: number;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
    media: MediaEntity[];
    actions: PostActionEntity[];
    comments: PostCommentEntity[];
    taggedUsers: UserEntity[];
}
