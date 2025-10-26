import { ChatEntity } from "src/database/entity/Chat.entity";
import { DataSource } from "typeorm";
import { CreateSingleChatDto } from "./dto/create-chat.dto";
import { ClsService } from "nestjs-cls";
import { UserEntity } from "src/database/entity/User.entity";
import { UserService } from "../user/user.service";
import { ParticipantEntity } from "src/database/entity/Participant.entity";
import { BanService } from "../ban/ban.service";
import { FollowService } from "../follow/follow.service";
import { MessageService } from "./message/message.service";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { CreateChatGroupDto } from "./dto/create-chat-group.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
export declare class ChatService {
    private dataSource;
    private cls;
    private userService;
    private banService;
    private followService;
    private messageService;
    private chatRepo;
    private participantRepo;
    constructor(dataSource: DataSource, cls: ClsService, userService: UserService, banService: BanService, followService: FollowService, messageService: MessageService);
    findChat(chatId: number): Promise<ChatEntity>;
    chatList(params: PaginationDto): Promise<{
        unreadCount: number;
        id: number;
        name: string;
        isGroup: boolean;
        adminId: number;
        lastMessageId: number;
        createdAt: Date;
        updatedAt: Date;
        admin: UserEntity;
        messages: import("../../database/entity/Message.entity").MessageEntity[];
        lastMessage: import("../../database/entity/Message.entity").MessageEntity;
        participants: ParticipantEntity[];
    }[]>;
    chatRequestList(params: PaginationDto): Promise<{
        unreadCount: number;
        id: number;
        name: string;
        isGroup: boolean;
        adminId: number;
        lastMessageId: number;
        createdAt: Date;
        updatedAt: Date;
        admin: UserEntity;
        messages: import("../../database/entity/Message.entity").MessageEntity[];
        lastMessage: import("../../database/entity/Message.entity").MessageEntity;
        participants: ParticipantEntity[];
    }[]>;
    createSingleChat(params: CreateSingleChatDto): Promise<{
        message: string;
    }>;
    updateChatLastMessage(chatId: number, messageId: number): Promise<void>;
    getItem(id: number): Promise<{
        unreadCount: number;
        id: number;
        name: string;
        isGroup: boolean;
        adminId: number;
        lastMessageId: number;
        createdAt: Date;
        updatedAt: Date;
        admin: UserEntity;
        messages: import("../../database/entity/Message.entity").MessageEntity[];
        lastMessage: import("../../database/entity/Message.entity").MessageEntity;
        participants: ParticipantEntity[];
    }>;
    createChatGroup(params: CreateChatGroupDto): Promise<ChatEntity>;
    leaveGroup(chatId: number): Promise<{
        message: string;
    }>;
    updateGroup(chatId: number, params: UpdateChatDto): Promise<{
        message: string;
        chat: ChatEntity;
    }>;
}
