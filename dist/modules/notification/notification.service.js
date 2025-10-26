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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const Notification_entity_1 = require("../../database/entity/Notification.entity");
const typeorm_2 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const notification_select_1 = require("../../shared/selects/notification.select");
const socket_gateway_1 = require("../socket/socket.gateway");
let NotificationService = class NotificationService {
    dataSource;
    cls;
    socketGateway;
    notificationRepo;
    constructor(dataSource, cls, socketGateway) {
        this.dataSource = dataSource;
        this.cls = cls;
        this.socketGateway = socketGateway;
        this.notificationRepo = this.dataSource.getRepository(Notification_entity_1.NotificationEntity);
    }
    async list(params) {
        let user = this.cls.get("user");
        let page = (params.page || 1) - 1;
        let limit = params.limit;
        let list = await this.notificationRepo.find({
            where: {
                userId: user.id
            },
            relations: [
                'sender',
                'sender.profile',
                'sender.profile.image',
                'post',
                'post.media',
                'comment',
                'story',
                'story.media'
            ],
            select: notification_select_1.NotificationSelect,
            order: { createdAt: 'DESC' },
            take: limit,
            skip: page * limit
        });
        return list;
    }
    async item(id) {
        let user = this.cls.get("user");
        let notification = await this.notificationRepo.findOne({
            where: {
                id,
                userId: user.id
            }
        });
        if (!notification)
            throw new common_1.NotFoundException("Notification is not found");
        return notification;
    }
    async createNotification(params) {
        let senderUser = this.cls.get("user");
        let notification = this.notificationRepo.create({
            userId: params.userId,
            senderId: senderUser.id,
            postId: params.postId,
            storyId: params.storyId,
            commentId: params.commentId,
            message: params.message,
            type: params.type
        });
        await notification.save();
        this.socketGateway.server
            .to(`user_${params.userId}`)
            .emit('notification', { id: notification.id });
        return {
            message: 'Notification created successfully'
        };
    }
    async updateNotifications(params) {
        let user = this.cls.get("user");
        const notifications = await this.notificationRepo.find({
            where: {
                id: (0, typeorm_1.In)(params.ids),
                userId: user.id
            }
        });
        if (!notifications.length) {
            throw new common_1.NotFoundException("No notifications found for the provided IDs");
        }
        notifications.forEach(notification => {
            notification.read = true;
        });
        await this.notificationRepo.save(notifications);
        return {
            message: "Notifications updated successfully",
        };
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        nestjs_cls_1.ClsService,
        socket_gateway_1.SocketGateway])
], NotificationService);
//# sourceMappingURL=notification.service.js.map