import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { MessageEntity } from "src/database/entity/Message.entity";
import { DataSource, Not, Repository } from "typeorm";
import { CreateMessageDto } from "./dto/create-message.dto";
import { ChatService } from "../chat.service";
import { ParticipantEntity } from "src/database/entity/Participant.entity";
import { ClsService } from "nestjs-cls";
import { UserEntity } from "src/database/entity/User.entity";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { MessageSelect } from "src/shared/selects/message.select";
import { SocketGateway } from "src/modules/socket/socket.gateway";

@Injectable()
export class MessageService {
    private messageRepo: Repository<MessageEntity>
    private participantRepo: Repository<ParticipantEntity>

    constructor(
        @InjectDataSource() private dataSource: DataSource,
        @Inject(forwardRef(() => ChatService))
        private chatService: ChatService,
        private cls: ClsService,
        private socketGateway: SocketGateway
    ) {
        this.messageRepo = this.dataSource.getRepository(MessageEntity)
        this.participantRepo = this.dataSource.getRepository(ParticipantEntity)
    }

 async createMessage(chatId: number, params: { content?: string | null, media?: string | null }) {
    // Content və ya media-dan ən azı biri olmalıdır
    if (!params.content && !params.media) {
        throw new BadRequestException("Either content or media must be provided");
    }

    let user = this.cls.get<UserEntity>("user");

    // Əgər media varsa, onun mövcudluğunu yoxlayın
    if (params.media) {
        // Media service-dən yoxlama (əgər varsa)
        // const mediaExists = await this.mediaService.findOne(params.media);
        // if (!mediaExists) throw new NotFoundException("Media not found");
    }

    const message = this.messageRepo.create({
        chat: { id: chatId } as any,
        user: { id: user.id } as any,
        content: params.content ?? undefined,
        media: params.media ? { id: params.media } as any : undefined,
    });

    await message.save();

    // Chat-ın son mesajını yeniləyin
    await this.chatService.updateChatLastMessage(chatId, message.id);

    return message;
}

    async chatMessages(chatId: number, params: PaginationDto) {
        let user = this.cls.get<UserEntity>("user")

        let chat = await this.chatService.findChat(chatId)

        if (!chat) throw new NotFoundException("Chat is not found")

        let checkParticipant = chat.participants.some((item) => item.userId === user.id)

        if (!checkParticipant) throw new NotFoundException("Chat is not found")

        let page = (params.page || 1) - 1;
        let limit = params.limit;

        await this.participantRepo.update({ userId: user.id, chatId: chat.id }, { unreadCount: 0 })

        let messages = await this.messageRepo.find({
            where: {
                isDeleted:false,
                chatId: chat.id
            },
            relations: ["user", "user.profile", "user.profile.image", "media"],
            select: MessageSelect,
            order: { createdAt: 'DESC' },
            take: limit,
            skip: page * limit
        })

        return messages
    }

    async deleteMessage(chatId: number, messageId: number) {
        let user = this.cls.get<UserEntity>("user")

        let message = await this.messageRepo.findOne({
            where: {
                chatId,
                userId: user.id,
                id: messageId
            }
        })

        if (!message) throw new NotFoundException("Message is not found")

        message.isDeleted = true

        await message.save()

        return {
            message: "Message is deleted successfully"
        }
    }
}