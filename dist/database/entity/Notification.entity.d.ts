import { NotificationEnum } from "src/shared/enums/Notification.enum";
import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { PostEntity } from "./Post.entity";
import { StoryEntity } from "./Story.entity";
import { PostCommentEntity } from "./PostComment.entity";
export declare class NotificationEntity extends BaseEntity {
    id: number;
    userId: number;
    user: UserEntity;
    senderId: number;
    sender: UserEntity;
    type: NotificationEnum;
    message: string;
    postId: number;
    post: PostEntity;
    storyId: number;
    story: StoryEntity;
    commentId: number;
    comment: PostCommentEntity;
    read: boolean;
    createdAt: Date;
}
