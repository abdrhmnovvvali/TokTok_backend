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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Chat_entity_1 = require("../../database/entity/Chat.entity");
const typeorm_2 = require("typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const user_service_1 = require("../user/user.service");
const Participant_entity_1 = require("../../database/entity/Participant.entity");
const ban_service_1 = require("../ban/ban.service");
const follow_service_1 = require("../follow/follow.service");
const message_service_1 = require("./message/message.service");
let ChatService = class ChatService {
    dataSource;
    cls;
    userService;
    banService;
    followService;
    messageService;
    chatRepo;
    participantRepo;
    constructor(dataSource, cls, userService, banService, followService, messageService) {
        this.dataSource = dataSource;
        this.cls = cls;
        this.userService = userService;
        this.banService = banService;
        this.followService = followService;
        this.messageService = messageService;
        this.chatRepo = this.dataSource.getRepository(Chat_entity_1.ChatEntity);
        this.participantRepo = this.dataSource.getRepository(Participant_entity_1.ParticipantEntity);
    }
    async findChat(chatId) {
        let chat = await this.chatRepo.findOne({
            where: {
                id: chatId
            },
            relations: ['participants']
        });
        if (!chat)
            throw new common_1.NotFoundException("Chat is not found");
        return chat;
    }
    async chatList(params) {
        let user = this.cls.get("user");
        const page = params.page || 1;
        const limit = params.limit || 10;
        const list = await this.chatRepo
            .createQueryBuilder("chat")
            .leftJoin("chat.participants", "myParticipant")
            .leftJoinAndSelect("chat.participants", "participants")
            .leftJoinAndSelect("participants.user", "user")
            .leftJoinAndSelect("user.profile", "profile")
            .leftJoinAndSelect("profile.image", "image")
            .leftJoinAndSelect("chat.lastMessage", "lastMessage")
            .leftJoinAndSelect("lastMessage.user", "lastMessageUser")
            .leftJoinAndSelect("lastMessageUser.profile", "lastMessageProfile")
            .leftJoinAndSelect("lastMessageProfile.image", "lastMessageImage")
            .where("myParticipant.userId = :userId", { userId: user.id })
            .andWhere("myParticipant.request = :request", { request: false })
            .select([
            'chat.id',
            'chat.name',
            'chat.isGroup',
            'chat.createdAt',
            'chat.updatedAt',
            'chat.adminId',
            'participants.id',
            'participants.unreadCount',
            'participants.request',
            'user.id',
            'user.username',
            'profile.id',
            'image.id',
            'image.url',
            'lastMessage.id',
            'lastMessage.content',
            'lastMessage.createdAt',
            'lastMessageUser.id',
            'lastMessageUser.username',
            'lastMessageProfile.id',
            'lastMessageImage.id',
            'lastMessageImage.url',
        ])
            .orderBy("chat.updatedAt", "DESC")
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return list.map((chat) => ({
            ...chat,
            unreadCount: chat.participants.find(participant => participant.user.id === user.id)?.unreadCount || 0
        }));
    }
    async chatRequestList(params) {
        let user = this.cls.get("user");
        const page = params.page || 1;
        const limit = params.limit || 10;
        const list = await this.chatRepo
            .createQueryBuilder("chat")
            .leftJoin("chat.participants", "myParticipant")
            .leftJoinAndSelect("chat.participants", "participants")
            .leftJoinAndSelect("participants.user", "user")
            .leftJoinAndSelect("user.profile", "profile")
            .leftJoinAndSelect("profile.image", "image")
            .leftJoinAndSelect("chat.lastMessage", "lastMessage")
            .leftJoinAndSelect("lastMessage.user", "lastMessageUser")
            .leftJoinAndSelect("lastMessageUser.profile", "lastMessageProfile")
            .leftJoinAndSelect("lastMessageProfile.image", "lastMessageImage")
            .where("myParticipant.userId = :userId", { userId: user.id })
            .andWhere("myParticipant.request = :request", { request: true })
            .select([
            'chat.id',
            'chat.name',
            'chat.isGroup',
            'chat.createdAt',
            'chat.updatedAt',
            'chat.adminId',
            'participants.id',
            'participants.unreadCount',
            'participants.request',
            'user.id',
            'user.username',
            'profile.id',
            'image.id',
            'image.url',
            'lastMessage.id',
            'lastMessage.content',
            'lastMessage.createdAt',
            'lastMessageUser.id',
            'lastMessageUser.username',
            'lastMessageProfile.id',
            'lastMessageImage.id',
            'lastMessageImage.url',
        ])
            .orderBy("chat.updatedAt", "DESC")
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return list.map((chat) => ({
            ...chat,
            unreadCount: chat.participants.find(participant => participant.user.id === user.id)?.unreadCount || 0
        }));
    }
    async createSingleChat(params) {
        let myUser = this.cls.get("user");
        if (myUser.id === params.userId)
            throw new common_1.BadRequestException("User id is valid");
        let user = await this.userService.findUser(params.userId);
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        let isBan = await this.banService.checkBan(myUser.id, user.id);
        if (isBan)
            throw new common_1.ForbiddenException("");
        let request = false;
        if (user.isPrivate) {
            let access = await this.followService.checkFollow(myUser.id, user.id);
            if (!access) {
                request = true;
            }
        }
        let myChats = await this.chatRepo
            .createQueryBuilder("c")
            .leftJoin("c.participants", "myParticipant")
            .leftJoinAndSelect("c.participants", "participants")
            .select(["c.id", "participants.id", "participants.userId"])
            .where("c.isGroup = FALSE")
            .andWhere("myParticipant.userId =:userId", { userId: myUser.id })
            .getMany();
        let chat = myChats.find(chat => {
            return chat.participants?.some(participant => {
                return participant.userId = user.id;
            });
        });
        if (!chat) {
            let participants = [];
            participants.push(this.participantRepo.create({ userId: myUser.id, request }));
            participants.push(this.participantRepo.create({ userId: user.id, request }));
            chat = this.chatRepo.create({
                participants
            });
            await chat.save();
        }
        await this.messageService.createMessage(chat.id, { content: params.content, media: params.media });
        return {
            message: "Chat created is successfully"
        };
    }
    async updateChatLastMessage(chatId, messageId) {
        await this.chatRepo.update({ id: chatId }, { lastMessageId: messageId });
    }
    async getItem(id) {
        let user = this.cls.get('user');
        const chat = await this.chatRepo
            .createQueryBuilder('chat')
            .leftJoin('chat.participants', 'myParticipant')
            .leftJoinAndSelect('chat.participants', 'participants')
            .leftJoinAndSelect('participants.user', 'user')
            .leftJoinAndSelect('user.profile', 'profile')
            .leftJoinAndSelect('profile.image', 'image')
            .leftJoinAndSelect('chat.lastMessage', 'lastMessage')
            .leftJoinAndSelect('lastMessage.user', 'lastMessageUser')
            .leftJoinAndSelect('lastMessageUser.profile', 'lastMessageProfile')
            .leftJoinAndSelect('lastMessageProfile.image', 'lastMessageImage')
            .where('myParticipant.userId = :userId', { userId: user.id })
            .andWhere(`chat.id =:id`, { id })
            .select([
            'chat.id',
            'chat.name',
            'chat.isGroup',
            'chat.createdAt',
            'chat.updatedAt',
            'chat.adminId',
            'participants.id',
            'participants.unreadCount',
            'user.id',
            'user.username',
            'profile.id',
            'image.id',
            'image.url',
            'lastMessage.id',
            'lastMessage.content',
            'lastMessage.createdAt',
            'lastMessageUser.id',
            'lastMessageUser.username',
            'lastMessageProfile.id',
            'lastMessageImage.id',
            'lastMessageImage.url',
        ])
            .orderBy('chat.updatedAt', 'DESC')
            .getOne();
        if (!chat)
            throw new common_1.NotFoundException('error');
        return {
            ...chat,
            unreadCount: chat.participants.find((participant) => participant.user.id === user.id)
                ?.unreadCount || 0,
        };
    }
    async createChatGroup(params) {
        let myUser = this.cls.get("user");
        let participantIds = [...new Set(params.participants)];
        const users = await this.userService.findUsers(participantIds);
        if (users.length !== params.participants.length) {
            throw new common_1.NotFoundException("User not found");
        }
        const banList = await this.banService.getBannedUsers(users.map(u => u.id));
        const privateUsersWithoutAccess = await this.followService.getUsersWithoutAccess(users.map(u => u.id));
        const validParticipants = users.filter(user => !banList.includes(user.id) && !privateUsersWithoutAccess.includes(user.id));
        if (validParticipants.length === 0) {
            throw new common_1.NotFoundException("No valid participants for chat");
        }
        const participants = validParticipants.map(user => this.participantRepo.create({ userId: user.id, request: false }));
        participants.push(this.participantRepo.create({ userId: myUser.id, request: false }));
        const chat = this.chatRepo.create({
            name: params.name,
            adminId: myUser.id,
            participants,
            isGroup: true
        });
        await this.chatRepo.save(chat);
        return chat;
    }
    async leaveGroup(chatId) {
        let myUser = this.cls.get("user");
        let chat = await this.chatRepo.findOne({
            where: {
                id: chatId,
                isGroup: true
            },
            relations: ["participants"]
        });
        if (!chat)
            throw new common_1.NotFoundException("Chat is not found");
        let checkParticipant = chat.participants.some(participant => participant.userId === myUser.id);
        if (!checkParticipant)
            throw new common_1.NotFoundException("Chat is not found");
        if (chat.adminId === myUser.id) {
            let participantIds = chat.participants.filter(participant => participant.userId !== myUser.id);
            if (participantIds.length > 1) {
                await this.chatRepo.update({ id: chat.id }, { adminId: participantIds[0].userId });
            }
            else {
                await this.chatRepo.delete({ id: chat.id });
                return {
                    message: "Group deleted as there were no participants left."
                };
            }
        }
        await this.participantRepo.delete({ userId: myUser.id, chatId: chat.id });
        return {
            message: "You have successfully left the group."
        };
    }
    async updateGroup(chatId, params) {
        let myUser = this.cls.get("user");
        let chat = await this.chatRepo.findOne({
            where: {
                id: chatId,
                isGroup: true
            },
            relations: ['participants']
        });
        if (!chat)
            throw new common_1.NotFoundException("Chat is not found");
        if (chat.adminId !== myUser.id) {
            throw new common_1.ForbiddenException("You're not allowed to update this chat");
        }
        if (params.name) {
            chat.name = params.name;
        }
        if (params.participants) {
            let participantIds = [...new Set(params.participants)];
            let users = await this.userService.findUsers(participantIds);
            if (users.length != participantIds.length) {
                throw new common_1.NotFoundException('Some of participants are not found');
            }
            let participants = participantIds.map((userId) => {
                let check = chat.participants.find((participant) => participant.userId === userId);
                return check || this.participantRepo.create({ userId });
            });
            let deleteParticipant = chat.participants.filter((participant) => !participantIds.includes(participant.id));
            let deleteParticipantIds = deleteParticipant.map((participant) => participant.id);
            await this.participantRepo.delete({ id: (0, typeorm_2.In)(deleteParticipantIds) });
            chat.participants = participants;
        }
        await chat.save();
        return {
            message: 'Chat is updated successfully',
            chat,
        };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => message_service_1.MessageService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        nestjs_cls_1.ClsService,
        user_service_1.UserService,
        ban_service_1.BanService,
        follow_service_1.FollowService,
        message_service_1.MessageService])
], ChatService);
//# sourceMappingURL=chat.service.js.map