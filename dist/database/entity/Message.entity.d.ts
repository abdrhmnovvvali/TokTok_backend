import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { MessageMediaEntity } from "./MessageMedia.entity";
import { ChatEntity } from "./Chat.entity";
export declare class MessageEntity extends BaseEntity {
    id: number;
    content: string;
    userId: number;
    chatId: number;
    isDeleted: boolean;
    user: UserEntity;
    chat: ChatEntity;
    media: MessageMediaEntity;
    createdAt: Date;
    updatedAt: Date;
}
