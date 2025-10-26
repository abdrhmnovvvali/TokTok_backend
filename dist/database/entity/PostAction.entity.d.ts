import { PostActionTypes } from "src/shared/enums/Post.enum";
import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { PostEntity } from "./Post.entity";
export declare class PostActionEntity extends BaseEntity {
    id: number;
    action: PostActionTypes;
    userId: number;
    postId: number;
    user: UserEntity;
    post: PostEntity;
}
