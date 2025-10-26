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
exports.PostActionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const PostAction_entity_1 = require("../../../database/entity/PostAction.entity");
const typeorm_2 = require("typeorm");
const post_service_1 = require("../post.service");
const follow_service_1 = require("../../follow/follow.service");
const user_service_1 = require("../../user/user.service");
const ban_service_1 = require("../../ban/ban.service");
const Post_enum_1 = require("../../../shared/enums/Post.enum");
const notification_service_1 = require("../../notification/notification.service");
const Notification_enum_1 = require("../../../shared/enums/Notification.enum");
let PostActionService = class PostActionService {
    dataSource;
    cls;
    postService;
    followService;
    userService;
    banService;
    notificationService;
    actionRepo;
    constructor(dataSource, cls, postService, followService, userService, banService, notificationService) {
        this.dataSource = dataSource;
        this.cls = cls;
        this.postService = postService;
        this.followService = followService;
        this.userService = userService;
        this.banService = banService;
        this.notificationService = notificationService;
        this.actionRepo = this.dataSource.getRepository(PostAction_entity_1.PostActionEntity);
    }
    async likePost(id) {
        let myUser = this.cls.get("user");
        let post = await this.postService.findPost(id);
        if (!post)
            throw new common_1.NotFoundException("Post is not found");
        if (post.userId !== myUser.id) {
            let user = await this.userService.findUser(post.userId);
            if (!user)
                throw new common_1.NotFoundException("User is not found");
            let isBan = await this.banService.checkBan(myUser.id, user.id);
            if (isBan)
                throw new common_1.ForbiddenException("You are banned from interacting with this user");
            if (user.isPrivate) {
                let access = await this.followService.checkFollow(myUser.id, user.id);
                if (!access)
                    throw new common_1.ForbiddenException("You do not have permission to like this post");
            }
        }
        let isLike = true;
        let like = await this.actionRepo.findOne({
            where: {
                userId: myUser.id,
                postId: post.id,
                action: Post_enum_1.PostActionTypes.LIKE
            }
        });
        if (like) {
            await this.actionRepo.delete({ id: like.id });
            await this.postService.incrementField(post.id, 'like', -1);
            isLike = false;
        }
        else {
            like = this.actionRepo.create({
                postId: post.id,
                userId: myUser.id,
                action: Post_enum_1.PostActionTypes.LIKE
            });
            await this.actionRepo.save(like);
            await this.postService.incrementField(post.id, 'like', 1);
            if (post.userId !== myUser.id) {
                await this.notificationService.createNotification({
                    userId: post.userId,
                    type: Notification_enum_1.NotificationEnum.LIKE,
                    message: `${myUser.username} liked your post`,
                    postId: post.id
                });
            }
        }
        return {
            message: isLike ? "Post liked successfully" : "Like removed successfully"
        };
    }
    async sharedPost(id) {
        let myUser = this.cls.get("user");
        let post = await this.postService.findPost(id);
        if (!post)
            throw new common_1.NotFoundException("Post is not found");
        if (myUser.id !== post.userId) {
            let user = await this.userService.findUser(post.userId);
            if (!user)
                throw new common_1.NotFoundException("User is not found");
            let isBan = await this.banService.checkBan(myUser.id, post.userId);
            if (isBan)
                throw new common_1.ForbiddenException("You are banned from sharing this post");
            if (user.isPrivate) {
                let access = await this.followService.checkFollow(myUser.id, user.id);
                if (!access)
                    throw new common_1.ForbiddenException("You do not have permission to share this post");
            }
        }
        let share = this.actionRepo.create({
            postId: post.id,
            userId: myUser.id,
            action: Post_enum_1.PostActionTypes.SHARED
        });
        await share.save();
        await this.postService.incrementField(post.id, 'shared', 1);
        return {
            message: "Post shared successfully"
        };
    }
    async viewPost(id) {
        let myUser = this.cls.get("user");
        let post = await this.postService.findPost(id);
        if (!post)
            throw new common_1.NotFoundException("Post is not found");
        let view = await this.actionRepo.findOne({
            where: {
                postId: post.id,
                userId: myUser.id,
                action: Post_enum_1.PostActionTypes.VIEW
            }
        });
        if (!view) {
            view = this.actionRepo.create({
                postId: post.id,
                userId: myUser.id,
                action: Post_enum_1.PostActionTypes.VIEW
            });
            await view.save();
            await this.postService.incrementField(post.id, 'view', 1);
        }
        return true;
    }
};
exports.PostActionService = PostActionService;
exports.PostActionService = PostActionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => post_service_1.PostService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        nestjs_cls_1.ClsService,
        post_service_1.PostService,
        follow_service_1.FollowService,
        user_service_1.UserService,
        ban_service_1.BanService,
        notification_service_1.NotificationService])
], PostActionService);
//# sourceMappingURL=post_action.service.js.map