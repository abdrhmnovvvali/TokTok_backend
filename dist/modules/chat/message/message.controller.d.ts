import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    chatMessages(chatId: number, query: PaginationDto): Promise<import("../../../database/entity/Message.entity").MessageEntity[]>;
    createMessage(chatId: number, body: CreateMessageDto): Promise<import("../../../database/entity/Message.entity").MessageEntity>;
    deleteMessage(chatId: number, id: number): Promise<{
        message: string;
    }>;
}
