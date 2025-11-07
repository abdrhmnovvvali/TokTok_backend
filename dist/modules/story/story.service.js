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
exports.StoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Story_entity_1 = require("../../database/entity/Story.entity");
const typeorm_2 = require("typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const story_select_1 = require("../../shared/selects/story.select");
const follow_service_1 = require("../follow/follow.service");
const ban_service_1 = require("../ban/ban.service");
const user_service_1 = require("../user/user.service");
const StoryAction_entity_1 = require("../../database/entity/StoryAction.entity");
const Story_enum_1 = require("../../shared/enums/Story.enum");
const notification_service_1 = require("../notification/notification.service");
const Notification_enum_1 = require("../../shared/enums/Notification.enum");
let StoryService = class StoryService {
    dataSource;
    cls;
    followService;
    banService;
    userService;
    notificationService;
    storyRepo;
    storyActionRepo;
    constructor(dataSource, cls, followService, banService, userService, notificationService) {
        this.dataSource = dataSource;
        this.cls = cls;
        this.followService = followService;
        this.banService = banService;
        this.userService = userService;
        this.notificationService = notificationService;
        this.storyRepo = this.dataSource.getRepository(Story_entity_1.StoryEntity);
        this.storyActionRepo = this.dataSource.getRepository(StoryAction_entity_1.StoryActionEntity);
    }
    async findStory(userId, storyId) {
        let story = await this.storyRepo.findOne({
            where: {
                userId,
                id: storyId
            }
        });
        if (!story)
            throw new common_1.NotFoundException("Story is not found");
        return story;
    }
    async create(params) {
        let user = this.cls.get("user");
        let story = this.storyRepo.create({
            userId: user.id,
            media: { id: params.media }
        });
        await story.save();
        return {
            message: "Story is created successfully"
        };
    }
    async myList(params) {
        let myUser = this.cls.get("user");
        let page = (params.page || 1) - 1;
        let limit = params.limit;
        let list = await this.storyRepo.find({
            where: {
                userId: myUser.id
            },
            relations: ['media'],
            select: story_select_1.StoryListSelect,
            order: { createdAt: 'DESC' },
            take: limit,
            skip: page * limit
        });
        return this.attachIsViewFlag(list, myUser.id);
    }
    async myStoryActiveList() {
        let user = this.cls.get("user");
        let list = await this.storyRepo.find({
            where: {
                userId: user.id,
                isActive: true
            },
            relations: ['media', 'actions', 'actions.user', 'actions.user.profile', 'actions.user.profile.image'],
            select: story_select_1.MyStorySelect,
            order: { createdAt: 'DESC' },
        });
        return this.attachIsViewFlag(list, user.id);
    }
    async userStoryActiveList(id) {
        let myUser = this.cls.get("user");
        if (myUser.id === id) {
            throw new common_1.BadRequestException("End point is wrong");
        }
        let user = await this.userService.findUser(id);
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        let isBan = await this.banService.checkBan(myUser.id, user.id);
        if (isBan)
            throw new common_1.ForbiddenException(`You are banned from interacting with user ${user.username}`);
        if (user.isPrivate) {
            let access = await this.followService.checkFollow(myUser.id, user.id);
            if (!access)
                throw new common_1.ForbiddenException(`You need to follow user ${user.username} to view their stories`);
        }
        let list = await this.storyRepo.find({
            where: {
                userId: user.id,
                isActive: true
            },
            relations: ['media'],
            select: story_select_1.StoryListSelect,
            order: { createdAt: 'DESC' },
        });
        return this.attachIsViewFlag(list, myUser.id);
    }
    async myFollowerStoryList() {
        let user = this.cls.get("user");
        let followings = await this.followService.listFollowing(user.id);
        if (followings.length === 0) {
            throw new common_1.NotFoundException("Followings is not found");
        }
        let ids = followings.map(item => item.to.id);
        let list = await this.storyRepo.find({
            where: {
                userId: (0, typeorm_2.In)(ids),
                isActive: true
            },
            relations: ['media', 'user', 'user.profile', 'user.profile.image'],
            select: story_select_1.StoryFolowingsSelect,
        });
        const listWithFlags = await this.attachIsViewFlag(list, user.id);
        const groupedStories = listWithFlags.reduce((acc, story) => {
            if (!acc[story.userId]) {
                acc[story.userId] = {
                    user: story.user,
                    stories: [],
                };
            }
            acc[story.userId].stories.push(story);
            return acc;
        }, {});
        let data = Object.values(groupedStories).map((group) => {
            group.stories.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            group.stories.forEach((story) => delete story.user);
            return { data: group.stories, user: group.user };
        });
        return data;
    }
    async deleteStory(id) {
        let user = this.cls.get("user");
        let story = await this.storyRepo.findOne({
            where: {
                id
            }
        });
        if (!story)
            throw new common_1.NotFoundException("Story is not found");
        if (user.id !== story.userId) {
            throw new common_1.ForbiddenException(`You are not authorized to delete this story`);
        }
        await this.storyRepo.delete({ id: story.id });
        return {
            message: "Story is deleted successfully"
        };
    }
    async likeStory(id) {
        let myUser = this.cls.get("user");
        let story = await this.storyRepo.findOne({
            where: {
                id,
                isActive: true
            }
        });
        if (!story)
            throw new common_1.NotFoundException("Story is not found");
        if (myUser.id !== story.userId) {
            let user = await this.userService.findUser(story.userId);
            if (!user)
                throw new common_1.NotFoundException("User is not found");
            let isBan = await this.banService.checkBan(myUser.id, story.userId);
            if (isBan)
                throw new common_1.ForbiddenException("You are banned from liking this story");
            if (user.isPrivate) {
                let access = await this.followService.checkFollow(myUser.id, story.userId);
                if (!access)
                    throw new common_1.ForbiddenException("You don't have access to like this story");
            }
        }
        let message = '';
        let like = await this.storyActionRepo.findOne({
            where: {
                userId: myUser.id,
                storyId: story.id,
                action: Story_enum_1.StoryActionTypes.LIKE
            }
        });
        if (like) {
            await this.storyActionRepo.delete({ id: like.id });
            message = 'Like is removed';
        }
        else {
            like = this.storyActionRepo.create({
                userId: myUser.id,
                storyId: story.id,
                action: Story_enum_1.StoryActionTypes.LIKE
            });
            await like.save();
            message = 'story is liked successfully';
            if (story.userId !== myUser.id) {
                await this.notificationService.createNotification({
                    userId: story.userId,
                    type: Notification_enum_1.NotificationEnum.LIKE,
                    message: `${myUser.username} liked your story`,
                    storyId: story.id
                });
            }
        }
        return { message };
    }
    async viewStory(id) {
        let myUser = this.cls.get("user");
        let story = await this.storyRepo.findOne({
            where: {
                id,
                isActive: true
            }
        });
        if (!story)
            throw new common_1.NotFoundException("Story is not found");
        if (story.userId === myUser.id) {
            throw new common_1.BadRequestException();
        }
        let user = await this.userService.findUser(story.userId);
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        let isBan = await this.banService.checkBan(myUser.id, story.userId);
        if (isBan)
            throw new common_1.ForbiddenException("You are banned from this story");
        if (user.isPrivate) {
            let access = await this.followService.checkFollow(myUser.id, story.userId);
            if (!access)
                throw new common_1.ForbiddenException("You don't have access to view this story");
        }
        let view = await this.storyActionRepo.findOne({
            where: {
                userId: myUser.id,
                storyId: story.id,
                action: Story_enum_1.StoryActionTypes.VIEW
            }
        });
        if (view) {
            throw new common_1.BadRequestException("You have already viewed this story");
        }
        else {
            view = this.storyActionRepo.create({
                userId: myUser.id,
                storyId: story.id,
                action: Story_enum_1.StoryActionTypes.VIEW
            });
            await view.save();
            await this.storyRepo.increment({ id: story.id }, "view", 1);
        }
        return {
            message: "Story viewed successfully"
        };
    }
    async attachIsViewFlag(stories, userId) {
        if (!stories || stories.length === 0) {
            return stories;
        }
        const viewedActions = await this.storyActionRepo.find({
            where: {
                userId,
                storyId: (0, typeorm_2.In)(stories.map(story => story.id)),
                action: Story_enum_1.StoryActionTypes.VIEW
            },
            select: {
                storyId: true
            }
        });
        const viewedStoryIds = new Set(viewedActions.map(action => action.storyId));
        return stories.map(story => {
            story.isView = viewedStoryIds.has(story.id);
            return story;
        });
    }
};
exports.StoryService = StoryService;
exports.StoryService = StoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        nestjs_cls_1.ClsService,
        follow_service_1.FollowService,
        ban_service_1.BanService,
        user_service_1.UserService,
        notification_service_1.NotificationService])
], StoryService);
//# sourceMappingURL=story.service.js.map