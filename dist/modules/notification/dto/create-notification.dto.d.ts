import { NotificationEnum } from "src/shared/enums/Notification.enum";
export declare class CreateNotificationDto {
    userId: number;
    type: NotificationEnum;
    message: string;
    postId?: number;
    storyId?: number;
    commentId?: number;
}
