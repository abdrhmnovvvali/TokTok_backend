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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const Follow_entity_1 = require("../../database/entity/Follow.entity");
const typeorm_2 = require("typeorm");
const Follow_enum_1 = require("../../shared/enums/Follow.enum");
const user_service_1 = require("../user/user.service");
const profile_service_1 = require("../user/profile/profile.service");
const follow_select_1 = require("../../shared/selects/follow.select");
const ban_service_1 = require("../ban/ban.service");
const notification_service_1 = require("../notification/notification.service");
const Notification_enum_1 = require("../../shared/enums/Notification.enum");
let FollowService = class FollowService {
    dataSource;
    cls;
    userService;
    profileService;
    banService;
    notificationService;
    followRepo;
    constructor(dataSource, cls, userService, profileService, banService, notificationService) {
        this.dataSource = dataSource;
        this.cls = cls;
        this.userService = userService;
        this.profileService = profileService;
        this.banService = banService;
        this.notificationService = notificationService;
        this.followRepo = this.dataSource.getRepository(Follow_entity_1.FollowEntity);
    }
    async checkStatus(fromId, toId) {
        let follow = await this.followRepo.findOne({
            where: {
                fromId,
                toId
            }
        });
        if (!follow) {
            return false;
        }
        return follow.status;
    }
    async listFollower(id) {
        let user = this.cls.get("user");
        let access = true;
        let currentUser = user;
        if (user.id !== id) {
            currentUser = await this.userService.findUser(id);
            if (!currentUser)
                throw new common_1.NotFoundException("User is not found");
            if (currentUser.isPrivate) {
                access = await this.checkFollow(user.id, currentUser.id);
                if (!access)
                    throw new common_1.ForbiddenException("You don't have permission to view this user's followers. This account is private and you need to be a follower to see this content.");
            }
        }
        let followers = await this.followRepo.find({
            where: {
                toId: currentUser.id,
                status: Follow_enum_1.FollowStatusEnum.ACCEPT
            },
            relations: [
                'from',
                'from.profile',
                'from.profile.image'
            ],
            select: follow_select_1.FollowersSelect
        });
        return followers;
    }
    async listFollowing(id) {
        let user = this.cls.get("user");
        let access = true;
        let currentUser = user;
        if (user.id !== id) {
            currentUser = await this.userService.findUser(id);
            if (!currentUser)
                throw new common_1.NotFoundException("User is not found");
            if (currentUser.isPrivate) {
                access = await this.checkFollow(user.id, currentUser.id);
                if (!access)
                    throw new common_1.ForbiddenException("You don't have permission to view this user's followings. This account is private and you need to be a following to see this content.");
            }
        }
        let followings = await this.followRepo.find({
            where: {
                fromId: currentUser.id,
                status: Follow_enum_1.FollowStatusEnum.ACCEPT
            },
            relations: [
                'to',
                'to.profile',
                'to.profile.image'
            ],
            select: follow_select_1.FollowingsSelect
        });
        return followings;
    }
    async followRequest(params) {
        let user = this.cls.get("user");
        if (params.to === user.id) {
            throw new common_1.BadRequestException("You cannot send a follow request to yourself.");
        }
        let isBan = await this.banService.checkBan(user.id, params.to);
        if (isBan)
            throw new common_1.ForbiddenException("You cannot follow this user. Either you have banned this user or they have banned you.");
        let checkFollow = await this.followRepo.findOne({
            where: {
                fromId: user.id,
                toId: params.to
            }
        });
        if (checkFollow) {
            if (checkFollow.status === Follow_enum_1.FollowStatusEnum.PENDING) {
                throw new common_1.BadRequestException("You have already sent a follow request to this user.");
            }
            else if (checkFollow.status === Follow_enum_1.FollowStatusEnum.ACCEPT) {
                throw new common_1.BadRequestException("You are already following this user.");
            }
        }
        let toUser = await this.userService.findUser(params.to);
        if (!toUser)
            throw new common_1.NotFoundException("User is not found");
        let notification = `${user.username} wants to follow you.`;
        let follow = this.followRepo.create({
            fromId: user.id,
            toId: toUser.id,
            status: toUser.isPrivate ? Follow_enum_1.FollowStatusEnum.PENDING : Follow_enum_1.FollowStatusEnum.ACCEPT
        });
        await follow.save();
        if (follow.status === Follow_enum_1.FollowStatusEnum.ACCEPT) {
            let promises = [];
            promises.push(this.profileService.incrementField(user.id, 'following', 1));
            promises.push(this.profileService.incrementField(toUser.id, 'follower', 1));
            await Promise.all(promises);
            notification = `${user.username} has started following you.`;
        }
        await this.notificationService.createNotification({
            message: notification,
            type: Notification_enum_1.NotificationEnum.FOLLOW,
            userId: toUser.id,
            commentId: undefined,
            postId: undefined,
            storyId: undefined
        });
        return {
            message: "Follow has been sent successfully"
        };
    }
    async pendingRequests() {
        let user = this.cls.get("user");
        let requests = await this.followRepo.find({
            where: {
                toId: user.id,
                status: Follow_enum_1.FollowStatusEnum.PENDING
            },
            relations: [
                'from',
                'from.profile',
                'from.profile.image'
            ],
            select: follow_select_1.PendingRequestsSelect
        });
        return requests;
    }
    async checkFollow(from, to) {
        let follow = await this.followRepo.exists({
            where: {
                fromId: from,
                toId: to,
                status: Follow_enum_1.FollowStatusEnum.ACCEPT
            }
        });
        return follow;
    }
    async acceptRequest(params) {
        let user = this.cls.get("user");
        if (params.from === user.id) {
            throw new common_1.BadRequestException("You cannot send a follow request to yourself.");
        }
        let follow = await this.followRepo.findOne({
            where: {
                fromId: params.from,
                toId: user.id,
                status: Follow_enum_1.FollowStatusEnum.PENDING
            }
        });
        if (!follow)
            throw new common_1.NotFoundException("Follow request not found");
        follow.status = Follow_enum_1.FollowStatusEnum.ACCEPT;
        await follow.save();
        let promises = [];
        promises.push(this.profileService.incrementField(user.id, 'follower', 1));
        promises.push(this.profileService.incrementField(params.from, 'following', 1));
        await Promise.all(promises);
        await this.notificationService.createNotification({
            userId: follow.fromId,
            message: `${user.username} has accepted your follow request.`,
            type: Notification_enum_1.NotificationEnum.FOLLOW
        });
        return {
            message: "Follow request accepted successfully."
        };
    }
    async acceptAllPendingRequests() {
        let pendingRequests = await this.pendingRequests();
        await Promise.all(pendingRequests.map(async (follow) => {
            await this.acceptRequest({ from: follow.from.id });
        }));
        return true;
    }
    async removeFollower(params) {
        let myUser = this.cls.get("user");
        if (myUser.id === params.from) {
            throw new common_1.BadRequestException("You cannot remove yourself as a follower");
        }
        let user = await this.userService.findUser(params.from);
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        let follow = await this.followRepo.findOne({
            where: {
                fromId: params.from,
                toId: myUser.id
            }
        });
        if (!follow)
            throw new common_1.NotFoundException("Follow request is not found");
        if (follow.status === Follow_enum_1.FollowStatusEnum.ACCEPT) {
            let promises = [];
            promises.push(this.profileService.incrementField(user.id, 'following', -1));
            promises.push(this.profileService.incrementField(myUser.id, 'follower', -1));
            await Promise.all(promises);
        }
        await this.followRepo.delete({ id: follow.id });
        return {
            message: "Follower has been successfully removed"
        };
    }
    async removeFollowing(params) {
        let myUser = this.cls.get("user");
        if (myUser.id === params.to) {
            throw new common_1.BadRequestException("You cannot remove yourself as a following");
        }
        let user = await this.userService.findUser(params.to);
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        let follow = await this.followRepo.findOne({
            where: {
                fromId: myUser.id,
                toId: params.to
            }
        });
        if (!follow)
            throw new common_1.NotFoundException("Follow request is not found");
        if (follow.status === Follow_enum_1.FollowStatusEnum.ACCEPT) {
            let promises = [];
            promises.push(this.profileService.incrementField(myUser.id, 'following', -1));
            promises.push(this.profileService.incrementField(user.id, 'follower', -1));
            await Promise.all(promises);
        }
        await this.followRepo.delete({ id: follow.id });
        return {
            message: "Following has been successfully removed"
        };
    }
    async getUsersWithoutAccess(userIds) {
        let myUser = this.cls.get("user");
        const privateUsers = await this.userService.getPrivateUsers(userIds);
        const followedUsers = await this.followRepo.find({
            where: {
                fromId: myUser.id,
                toId: (0, typeorm_2.In)(userIds),
                status: Follow_enum_1.FollowStatusEnum.ACCEPT
            },
            select: ["toId"]
        });
        const followedUserIds = followedUsers.map(f => f.toId);
        return privateUsers
            .map(user => user.id)
            .filter(id => !followedUserIds.includes(id));
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => profile_service_1.ProfileService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => ban_service_1.BanService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        nestjs_cls_1.ClsService,
        user_service_1.UserService,
        profile_service_1.ProfileService,
        ban_service_1.BanService,
        notification_service_1.NotificationService])
], FollowService);
//# sourceMappingURL=follow.service.js.map