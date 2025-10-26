import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { MessageEntity } from "./Message.entity";
import { ParticipantEntity } from "./Participant.entity";
export declare class ChatEntity extends BaseEntity {
    id: number;
    name: string;
    isGroup: boolean;
    adminId: number;
    lastMessageId: number;
    createdAt: Date;
    updatedAt: Date;
    admin: UserEntity;
    messages: MessageEntity[];
    lastMessage: MessageEntity;
    participants: ParticipantEntity[];
}
