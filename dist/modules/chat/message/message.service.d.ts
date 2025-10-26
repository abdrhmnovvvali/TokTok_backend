import { MessageEntity } from "src/database/entity/Message.entity";
import { DataSource } from "typeorm";
import { ChatService } from "../chat.service";
import { ClsService } from "nestjs-cls";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { SocketGateway } from "src/modules/socket/socket.gateway";
export declare class MessageService {
    private dataSource;
    private chatService;
    private cls;
    private socketGateway;
    private messageRepo;
    private participantRepo;
    constructor(dataSource: DataSource, chatService: ChatService, cls: ClsService, socketGateway: SocketGateway);
    createMessage(chatId: number, params: {
        content?: string | null;
        media?: string | null;
    }): Promise<MessageEntity>;
    chatMessages(chatId: number, params: PaginationDto): Promise<MessageEntity[]>;
    deleteMessage(chatId: number, messageId: number): Promise<{
        message: string;
    }>;
}
