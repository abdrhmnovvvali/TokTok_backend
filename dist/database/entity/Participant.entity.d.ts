import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { ChatEntity } from "./Chat.entity";
export declare class ParticipantEntity extends BaseEntity {
    id: number;
    chatId: number;
    request: boolean;
    userId: number;
    chat: ChatEntity;
    user: UserEntity;
    unreadCount: number;
}
