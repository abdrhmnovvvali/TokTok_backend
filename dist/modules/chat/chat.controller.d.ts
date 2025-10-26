import { ChatService } from "./chat.service";
import { CreateSingleChatDto } from "./dto/create-chat.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { CreateChatGroupDto } from "./dto/create-chat-group.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    chatList(query: PaginationDto): Promise<{
        unreadCount: number;
        id: number;
        name: string;
        isGroup: boolean;
        adminId: number;
        lastMessageId: number;
        createdAt: Date;
        updatedAt: Date;
        admin: import("../../database/entity/User.entity").UserEntity;
        messages: import("../../database/entity/Message.entity").MessageEntity[];
        lastMessage: import("../../database/entity/Message.entity").MessageEntity;
        participants: import("../../database/entity/Participant.entity").ParticipantEntity[];
    }[]>;
    getItem(id: number): Promise<{
        unreadCount: number;
        id: number;
        name: string;
        isGroup: boolean;
        adminId: number;
        lastMessageId: number;
        createdAt: Date;
        updatedAt: Date;
        admin: import("../../database/entity/User.entity").UserEntity;
        messages: import("../../database/entity/Message.entity").MessageEntity[];
        lastMessage: import("../../database/entity/Message.entity").MessageEntity;
        participants: import("../../database/entity/Participant.entity").ParticipantEntity[];
    }>;
    chatRequestList(query: PaginationDto): Promise<{
        unreadCount: number;
        id: number;
        name: string;
        isGroup: boolean;
        adminId: number;
        lastMessageId: number;
        createdAt: Date;
        updatedAt: Date;
        admin: import("../../database/entity/User.entity").UserEntity;
        messages: import("../../database/entity/Message.entity").MessageEntity[];
        lastMessage: import("../../database/entity/Message.entity").MessageEntity;
        participants: import("../../database/entity/Participant.entity").ParticipantEntity[];
    }[]>;
    createSingleChat(body: CreateSingleChatDto): Promise<{
        message: string;
    }>;
    group(body: CreateChatGroupDto): Promise<import("../../database/entity/Chat.entity").ChatEntity>;
    updateGroup(id: number, body: UpdateChatDto): Promise<{
        message: string;
        chat: import("../../database/entity/Chat.entity").ChatEntity;
    }>;
    leaveGroup(id: number): Promise<{
        message: string;
    }>;
}
