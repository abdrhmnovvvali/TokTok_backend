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
exports.PostCommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const PostComment_entity_1 = require("../../../database/entity/PostComment.entity");
const user_service_1 = require("../../user/user.service");
const typeorm_2 = require("typeorm");
const post_service_1 = require("../post.service");
const ban_service_1 = require("../../ban/ban.service");
const follow_service_1 = require("../../follow/follow.service");
const comment_select_1 = require("../../../shared/selects/comment.select");
const CommentLike_entity_1 = require("../../../database/entity/CommentLike.entity");
const notification_service_1 = require("../../notification/notification.service");
const Notification_enum_1 = require("../../../shared/enums/Notification.enum");
let PostCommentService = class PostCommentService {
    dataSource;
    cls;
    userService;
    postService;
    banService;
    followService;
    notificationService;
    postCommentRepo;
    postCommentLikeRepo;
    constructor(dataSource, cls, userService, postService, banService, followService, notificationService) {
        this.dataSource = dataSource;
        this.cls = cls;
        this.userService = userService;
        this.postService = postService;
        this.banService = banService;
        this.followService = followService;
        this.notificationService = notificationService;
        this.postCommentRepo = this.dataSource.getRepository(PostComment_entity_1.PostCommentEntity);
        this.postCommentLikeRepo = this.dataSource.getRepository(CommentLike_entity_1.CommentLikeEntity);
    }
    async list(id, params) {
        let myUser = this.cls.get("user");
        let post = await this.postService.findPost(id);
        if (!post)
            throw new common_1.NotFoundException("Post is not found");
        if (myUser.id !== post.userId) {
            let user = await this.userService.findUser(post.userId);
            if (!user)
                throw new common_1.NotFoundException("User is not found");
            let isBan = await this.banService.checkBan(myUser.id, user.id);
            if (isBan)
                throw new common_1.ForbiddenException("You are banned from interacting with this user");
            if (user.isPrivate) {
                let access = await this.followService.checkFollow(myUser.id, user.id);
                if (!access)
                    throw new common_1.ForbiddenException("You do not have permission to comment on this post");
            }
        }
        let page = (params.page || 1) - 1;
        let limit = params.limit;
        let list = await this.postCommentRepo.find({
            where: {
                postId: id,
                parentCommentId: (0, typeorm_2.IsNull)()
            },
            relations: [
                'user',
                'user.profile',
                'user.profile.image',
                'replies',
                'replies.user',
                'replies.user.profile',
                'replies.user.profile.image',
            ],
            order: {
                createdAt: 'DESC',
            },
            skip: page * limit,
            take: limit,
            select: comment_select_1.CommentSelect
        });
        return list;
    }
    async create(id, params) {
        let myUser = this.cls.get("user");
        let post = await this.postService.findPost(id);
        if (!post)
            throw new common_1.NotFoundException("Post is not found");
        if (myUser.id !== post.userId) {
            let user = await this.userService.findUser(post.userId);
            if (!user)
                throw new common_1.NotFoundException("User is not found");
            let isBan = await this.banService.checkBan(myUser.id, user.id);
            if (isBan)
                throw new common_1.ForbiddenException("You are banned from interacting with this user");
            if (user.isPrivate) {
                let access = await this.followService.checkFollow(myUser.id, user.id);
                if (!access)
                    throw new common_1.ForbiddenException("You do not have permission to comment on this post");
            }
        }
        if (params.parentCommentId) {
            let parentComment = await this.postCommentRepo.findOne({
                where: {
                    id: params.parentCommentId
                }
            });
            if (!parentComment)
                throw new common_1.NotFoundException("Comment is not found");
            if (parentComment.parentCommentId !== null)
                throw new common_1.BadRequestException("Something went wrong");
        }
        let comment = this.postCommentRepo.create({
            content: params.content,
            parentCommentId: params.parentCommentId,
            userId: myUser.id,
            postId: post.id
        });
        await comment.save();
        if (comment.parentCommentId) {
            await this.incrementField(comment.parentCommentId, 'replyCount', 1);
        }
        await this.postService.incrementField(post.id, 'commentCount', 1);
        await this.notificationService.createNotification({
            userId: post.userId,
            type: Notification_enum_1.NotificationEnum.COMMENT,
            message: `${myUser.username} commented on your post`,
            postId: post.id,
            commentId: comment.id
        });
        return {
            message: "Comment is created successfully"
        };
    }
    async like(commentId) {
        let user = this.cls.get("user");
        let comment = await this.postCommentRepo.findOne({
            where: {
                id: commentId
            }
        });
        if (!comment)
            throw new common_1.NotFoundException("Comment is not found");
        let like = await this.postCommentLikeRepo.findOne({
            where: {
                commentId: comment.id,
                userId: user.id
            }
        });
        let value = 1;
        let message = "";
        if (like) {
            await this.postCommentLikeRepo.delete({ id: like.id });
            value = -1;
            message = "Like removed";
        }
        else {
            like = this.postCommentLikeRepo.create({
                userId: user.id,
                commentId: comment.id
            });
            await like.save();
            message = "Like added";
            await this.notificationService.createNotification({
                userId: comment.userId,
                message: `${user.username} liked your comment`,
                type: Notification_enum_1.NotificationEnum.LIKE,
                postId: comment.postId,
                commentId: comment.id
            });
        }
        await this.incrementField(commentId, 'likesCount', value);
        return {
            message: message
        };
    }
    async update(commentId, params) {
        let myUser = this.cls.get("user");
        let comment = await this.postCommentRepo.findOne({
            where: {
                id: commentId
            }
        });
        if (!comment)
            throw new common_1.NotFoundException("Comment is not found");
        if (comment.userId !== myUser.id) {
            throw new common_1.ForbiddenException("You do not have permission to update this comment");
        }
        comment.content = params.content;
        await comment.save();
        return {
            message: "Comment is updated successfully"
        };
    }
    async delete(postId, commentId) {
        let user = this.cls.get("user");
        let post = await this.postService.findPost(postId);
        if (!post)
            throw new common_1.NotFoundException("Post is not found");
        let comment = await this.postCommentRepo.findOne({
            where: {
                id: commentId
            }
        });
        if (!comment)
            throw new common_1.NotFoundException("Comment is not found");
        if (user.id === post.userId || user.id === comment.userId) {
            await this.postCommentRepo.delete({ id: commentId });
            if (comment.parentCommentId) {
                await this.incrementField(comment.parentCommentId, 'replyCount', -1);
            }
            await this.postService.incrementField(post.id, 'commentCount', -1);
            return {
                message: "Comment is deleted successfully"
            };
        }
        else {
            throw new common_1.ForbiddenException("You do not have permission to delete this comment");
        }
    }
    async incrementField(id, field, value) {
        await this.postCommentRepo.increment({ id }, field, value);
    }
};
exports.PostCommentService = PostCommentService;
exports.PostCommentService = PostCommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        nestjs_cls_1.ClsService,
        user_service_1.UserService,
        post_service_1.PostService,
        ban_service_1.BanService,
        follow_service_1.FollowService,
        notification_service_1.NotificationService])
], PostCommentService);
//# sourceMappingURL=postComment.service.js.map