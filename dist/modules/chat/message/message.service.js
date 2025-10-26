"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Message_entity_1 = require("../../../database/entity/Message.entity");
const typeorm_2 = require("typeorm");
const chat_service_1 = require("../chat.service");
const Participant_entity_1 = require("../../../database/entity/Participant.entity");
const nestjs_cls_1 = require("nestjs-cls");
const message_select_1 = require("../../../shared/selects/message.select");
const socket_gateway_1 = require("../../socket/socket.gateway");
let MessageService = class MessageService {
    dataSource;
    chatService;
    cls;
    socketGateway;
    messageRepo;
    participantRepo;
    constructor(dataSource, chatService, cls, socketGateway) {
        this.dataSource = dataSource;
        this.chatService = chatService;
        this.cls = cls;
        this.socketGateway = socketGateway;
        this.messageRepo = this.dataSource.getRepository(Message_entity_1.MessageEntity);
        this.participantRepo = this.dataSource.getRepository(Participant_entity_1.ParticipantEntity);
    }
    async createMessage(chatId, params) {
        if (!params.content && !params.media) {
            throw new common_1.BadRequestException("Either content or media must be provided");
        }
        let user = this.cls.get("user");
        if (params.media) {
        }
        const message = this.messageRepo.create({
            chat: { id: chatId },
            user: { id: user.id },
            content: params.content ?? undefined,
            media: params.media ? { id: params.media } : undefined,
        });
        await message.save();
        await this.chatService.updateChatLastMessage(chatId, message.id);
        return message;
    }
    async chatMessages(chatId, params) {
        let user = this.cls.get("user");
        let chat = await this.chatService.findChat(chatId);
        if (!chat)
            throw new common_1.NotFoundException("Chat is not found");
        let checkParticipant = chat.participants.some((item) => item.userId === user.id);
        if (!checkParticipant)
            throw new common_1.NotFoundException("Chat is not found");
        let page = (params.page || 1) - 1;
        let limit = params.limit;
        await this.participantRepo.update({ userId: user.id, chatId: chat.id }, { unreadCount: 0 });
        let messages = await this.messageRepo.find({
            where: {
                chatId: chat.id
            },
            relations: ["user", "user.profile", "user.profile.image", "media"],
            select: message_select_1.MessageSelect,
            order: { createdAt: 'DESC' },
            take: limit,
            skip: page * limit
        });
        return messages;
    }
    async deleteMessage(chatId, messageId) {
        let user = this.cls.get("user");
        let message = await this.messageRepo.findOne({
            where: {
                chatId,
                userId: user.id,
                id: messageId
            }
        });
        if (!message)
            throw new common_1.NotFoundException("Message is not found");
        message.isDeleted = true;
        await message.save();
        return {
            message: "Message is deleted successfully"
        };
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => chat_service_1.ChatService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        chat_service_1.ChatService,
        nestjs_cls_1.ClsService,
        socket_gateway_1.SocketGateway])
], MessageService);
//# sourceMappingURL=message.service.js.map