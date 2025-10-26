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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Post_entity_1 = require("../../database/entity/Post.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const nestjs_cls_1 = require("nestjs-cls");
const profile_service_1 = require("../user/profile/profile.service");
const follow_service_1 = require("../follow/follow.service");
const ban_service_1 = require("../ban/ban.service");
const post_selects_1 = require("../../shared/selects/post.selects");
const post_action_service_1 = require("./post_action/post_action.service");
const notification_service_1 = require("../notification/notification.service");
const Notification_enum_1 = require("../../shared/enums/Notification.enum");
let PostService = class PostService {
    dataSource;
    userService;
    profileService;
    followService;
    banService;
    postActionService;
    cls;
    notificationService;
    postRepo;
    constructor(dataSource, userService, profileService, followService, banService, postActionService, cls, notificationService) {
        this.dataSource = dataSource;
        this.userService = userService;
        this.profileService = profileService;
        this.followService = followService;
        this.banService = banService;
        this.postActionService = postActionService;
        this.cls = cls;
        this.notificationService = notificationService;
        this.postRepo = this.dataSource.getRepository(Post_entity_1.PostEntity);
    }
    async feed(params) {
        let myUser = this.cls.get("user");
        let page = (params.page || 1) - 1;
        let limit = params.limit;
        let followings = await this.followService.listFollowing(myUser.id);
        if (followings.length === 0) {
            throw new common_1.NotFoundException("Followings is not found");
        }
        let ids = followings.map(item => item.to.id);
        let list = await this.postRepo.find({
            where: {
                userId: (0, typeorm_2.In)(ids),
                isActive: true
            },
            relations: ['media', 'user', 'user.profile', 'user.profile.image', 'taggedUsers'],
            select: post_selects_1.PostsSelect,
            order: { createdAt: "DESC" },
            take: limit,
            skip: page * limit
        });
        return list;
    }
    async createPost(params) {
        const myUser = this.cls.get("user");
        if (!myUser) {
            throw new common_1.UnauthorizedException("User not authenticated");
        }
        let taggedUsers = [];
        const post = this.postRepo.create({
            content: params.content,
            userId: myUser.id,
            media: params.media?.map(id => ({ id })) || []
        });
        if (params.taggedUserIds && params.taggedUserIds.length > 0) {
            params.taggedUserIds = params.taggedUserIds.filter(id => id !== myUser.id);
            if (params.taggedUserIds.length > 0) {
                taggedUsers = await this.userService.findUsers(params.taggedUserIds);
                if (params.taggedUserIds.length !== taggedUsers.length) {
                    throw new common_1.NotFoundException("One or more tagged users not found");
                }
                const errorMessages = [];
                for (const user of taggedUsers) {
                    const isBan = await this.banService.checkBan(myUser.id, user.id);
                    if (isBan) {
                        errorMessages.push(`User ${user.username || user.id} has blocked you.`);
                        continue;
                    }
                    if (user.isPrivate) {
                        const hasAccess = await this.followService.checkFollow(myUser.id, user.id);
                        if (!hasAccess) {
                            errorMessages.push(`You don't have permission to view ${user.username || user.id}'s private profile.`);
                        }
                    }
                }
                if (errorMessages.length > 0) {
                    throw new common_1.ForbiddenException(errorMessages.join(' '));
                }
                post.taggedUsers = taggedUsers;
            }
        }
        await post.save();
        await this.profileService.incrementField(myUser.id, 'postCount', 1);
        if (post.taggedUsers && post.taggedUsers.length > 0) {
            await Promise.all(post.taggedUsers.map(tag => this.notificationService.createNotification({
                userId: tag.id,
                type: Notification_enum_1.NotificationEnum.TAGS,
                message: `${myUser.username} tagged you in a post`,
                postId: post.id
            })));
        }
        return {
            message: "Post is created successfully"
        };
    }
    async findPost(id) {
        let post = await this.postRepo.findOne({
            where: {
                id
            }
        });
        if (!post)
            throw new common_1.NotFoundException("Post is not found");
        return post;
    }
    async item(id) {
        let myUser = this.cls.get("user");
        let post = await this.postRepo.findOne({
            where: {
                id
            },
            relations: ['media', 'taggedUsers', 'user', 'user.profile', 'user.profile.image'],
            select: post_selects_1.PostsSelect
        });
        if (!post)
            throw new common_1.NotFoundException("Post is not found");
        if (post.user.id !== myUser.id) {
            let isBan = await this.banService.checkBan(myUser.id, post.user.id);
            if (isBan)
                throw new common_1.ForbiddenException("You are banned from accessing this post.");
            let user = await this.userService.findUser(post.user.id);
            if (!user)
                throw new common_1.BadRequestException("Something went wrong");
            if (user.isPrivate) {
                let access = await this.followService.checkFollow(myUser.id, post.user.id);
                if (!access)
                    throw new common_1.ForbiddenException("You do not have permission to access this post.");
            }
        }
        await this.postActionService.viewPost(post.id);
        return post;
    }
    async myPosts(params) {
        let user = this.cls.get("user");
        let page = (params.page || 1) - 1;
        let limit = params.limit;
        let list = await this.postRepo.find({
            where: {
                userId: user.id,
                isActive: true
            },
            relations: ['media', 'taggedUsers', 'user', 'user.profile', 'user.profile.image'],
            select: post_selects_1.PostsSelect,
            order: { createdAt: "DESC" },
            take: limit,
            skip: page * limit
        });
        return list;
    }
    async userPosts(id, params) {
        let myUser = this.cls.get("user");
        if (myUser.id === id) {
            throw new common_1.BadRequestException("Invalid endpoint. You cannot view your own posts using this endpoint.");
        }
        let user = await this.userService.findUser(id);
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        let isBan = await this.banService.checkBan(myUser.id, user.id);
        if (isBan)
            throw new common_1.ForbiddenException("You have been blocked by this user.");
        let access = true;
        if (user.isPrivate) {
            access = await this.followService.checkFollow(myUser.id, user.id);
        }
        if (!access)
            throw new common_1.ForbiddenException("You do not have permission to view this user's posts. This account is private.");
        let page = (params.page || 1) - 1;
        let limit = params.limit;
        let list = await this.postRepo.find({
            where: {
                userId: user.id,
                isActive: true
            },
            relations: ['media', 'taggedUsers', 'user', 'user.profile', 'user.profile.image'],
            select: post_selects_1.PostsSelect,
            order: { createdAt: "DESC" },
            take: limit,
            skip: page * limit
        });
        return list;
    }
    async deletePost(id) {
        let user = this.cls.get("user");
        let post = await this.postRepo.findOne({
            where: {
                id
            }
        });
        if (!post)
            throw new common_1.NotFoundException("Post is not found");
        if (post.userId !== user.id) {
            throw new common_1.ForbiddenException("You do not have permission to delete this post");
        }
        let { affected } = await this.postRepo.delete({ id: post.id });
        if (!affected)
            throw new common_1.BadRequestException("Failed to delete post");
        await this.profileService.incrementField(post.userId, 'postCount', -1);
        return {
            message: "Post is deleted successfully"
        };
    }
    async listArchive(params) {
        let user = this.cls.get("user");
        let page = (params.page || 1) - 1;
        let limit = params.limit;
        let list = await this.postRepo.find({
            where: {
                userId: user.id,
                isActive: false
            },
            relations: ['media', 'taggedUsers', 'user', 'user.profile', 'user.profile.image'],
            select: post_selects_1.PostsSelect,
            order: { createdAt: "DESC" },
            take: limit,
            skip: page * limit
        });
        return list;
    }
    async toggleArchive(id) {
        let user = this.cls.get("user");
        let post = await this.postRepo.findOne({
            where: {
                id
            }
        });
        if (!post)
            throw new common_1.NotFoundException("Post is not found");
        if (user.id !== post.userId) {
            throw new common_1.ForbiddenException("You do not have permission to archive this post.");
        }
        post.isActive = !post.isActive;
        await post.save();
        return {
            message: `Post has been ${post.isActive ? "unarchived" : "archived"}.`
        };
    }
    async incrementField(postId, field, value) {
        await this.postRepo.increment({ id: postId }, field, value);
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => profile_service_1.ProfileService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => follow_service_1.FollowService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => ban_service_1.BanService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => post_action_service_1.PostActionService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        user_service_1.UserService,
        profile_service_1.ProfileService,
        follow_service_1.FollowService,
        ban_service_1.BanService,
        post_action_service_1.PostActionService,
        nestjs_cls_1.ClsService,
        notification_service_1.NotificationService])
], PostService);
//# sourceMappingURL=post.service.js.map