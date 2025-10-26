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
exports.HighlightService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const Highlight_entity_1 = require("../../database/entity/Highlight.entity");
const HighlightStory_entity_1 = require("../../database/entity/HighlightStory.entity");
const typeorm_2 = require("@nestjs/typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const story_service_1 = require("../story/story.service");
const user_service_1 = require("../user/user.service");
const ban_service_1 = require("../ban/ban.service");
const follow_service_1 = require("../follow/follow.service");
const highlights_selects_1 = require("../../shared/selects/highlights.selects");
let HighlightService = class HighlightService {
    dataSource;
    cls;
    storyService;
    userService;
    banService;
    followService;
    highlightRepo;
    highlightStoryRepo;
    constructor(dataSource, cls, storyService, userService, banService, followService) {
        this.dataSource = dataSource;
        this.cls = cls;
        this.storyService = storyService;
        this.userService = userService;
        this.banService = banService;
        this.followService = followService;
        this.highlightRepo = this.dataSource.getRepository(Highlight_entity_1.HighlightEntity);
        this.highlightStoryRepo = this.dataSource.getRepository(HighlightStory_entity_1.HighlightStoryEntity);
    }
    async item(id) {
        let myUser = this.cls.get("user");
        let highlight = await this.highlightRepo.findOne({
            where: { id },
            relations: ["highlightStories", "highlightStories.story", "highlightStories.story.media"],
            select: highlights_selects_1.HighlightSelect
        });
        if (!highlight)
            throw new common_1.NotFoundException("Highlight is not found");
        if (highlight.userId !== myUser.id) {
            let user = await this.userService.findUser(highlight.userId);
            if (!user)
                throw new common_1.NotFoundException("User is not found");
            let isBan = await this.banService.checkBan(myUser.id, user.id);
            if (isBan)
                throw new common_1.ForbiddenException("You are banned from interacting with this user");
            if (user.isPrivate) {
                let access = await this.followService.checkFollow(myUser.id, user.id);
                if (!access)
                    throw new common_1.ForbiddenException("You do not have permission to view this profile");
            }
        }
        return highlight;
    }
    async highlightList(id) {
        let myUser = this.cls.get("user");
        if (myUser.id !== id) {
            let user = await this.userService.findUser(id);
            if (!user)
                throw new common_1.NotFoundException("User is not found");
            let isBan = await this.banService.checkBan(myUser.id, user.id);
            if (isBan)
                throw new common_1.ForbiddenException("You are banned from interacting with this user");
            if (user.isPrivate) {
                let access = await this.followService.checkFollow(myUser.id, user.id);
                if (!access)
                    throw new common_1.ForbiddenException("You do not have permission to view this profile");
            }
        }
        let list = await this.highlightRepo.find({
            where: {
                userId: myUser.id !== id ? id : myUser.id
            },
            order: { createdAt: "DESC" }
        });
        return list;
    }
    async createHighlight(params) {
        let myUser = this.cls.get("user");
        let story = await this.storyService.findStory(myUser.id, params.storyId);
        if (!story)
            throw new common_1.NotFoundException("Story is not found");
        let highlight = this.highlightRepo.create({
            name: params.name,
            userId: myUser.id
        });
        await highlight.save();
        let highlightStory = this.highlightStoryRepo.create({
            storyId: story.id,
            highlightId: highlight.id
        });
        await highlightStory.save();
        return {
            message: "Highlight is created successfully"
        };
    }
    async add(id, params) {
        let myUser = this.cls.get("user");
        let highlight = await this.highlightRepo.findOne({
            where: {
                id,
                userId: myUser.id
            }
        });
        if (!highlight)
            throw new common_1.NotFoundException("Highlight is not found");
        let story = await this.storyService.findStory(myUser.id, params.storyId);
        if (!story)
            throw new common_1.NotFoundException("Story is not found");
        let highlightStory = this.highlightStoryRepo.create({
            highlightId: highlight.id,
            storyId: story.id
        });
        await highlightStory.save();
        return {
            message: "Story has been added successfully"
        };
    }
    async remove(id, params) {
        let myUser = this.cls.get("user");
        let highlight = await this.highlightRepo.findOne({
            where: {
                id,
                userId: myUser.id
            }
        });
        if (!highlight)
            throw new common_1.NotFoundException("Highlight is not found");
        let highlightStory = await this.highlightStoryRepo.findOne({
            where: {
                storyId: params.storyId,
                highlightId: highlight.id
            }
        });
        if (!highlightStory)
            throw new common_1.NotFoundException("Story is not found");
        await this.highlightStoryRepo.delete({ id: highlightStory.id });
        return {
            message: "Story removed successfully"
        };
    }
    async delete(id) {
        let myUser = this.cls.get("user");
        let highlight = await this.highlightRepo.findOne({
            where: { id, userId: myUser.id }
        });
        if (!highlight)
            throw new common_1.NotFoundException("Highlight is not found");
        await this.highlightRepo.delete({ id: highlight.id });
        return {
            message: "Highlight is deleted successfully"
        };
    }
};
exports.HighlightService = HighlightService;
exports.HighlightService = HighlightService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        nestjs_cls_1.ClsService,
        story_service_1.StoryService,
        user_service_1.UserService,
        ban_service_1.BanService,
        follow_service_1.FollowService])
], HighlightService);
//# sourceMappingURL=highlight.service.js.map