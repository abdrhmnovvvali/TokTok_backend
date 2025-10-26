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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const Auth_guard_1 = require("../../shared/guards/Auth.guard");
const update_username_dto_1 = require("./dto/update-username.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const update_email_dto_1 = require("./dto/update-email.dto");
const follow_service_1 = require("../follow/follow.service");
const ban_service_1 = require("../ban/ban.service");
const post_service_1 = require("../post/post.service");
const pagination_dto_1 = require("../../shared/dto/pagination.dto");
const story_service_1 = require("../story/story.service");
const highlight_service_1 = require("../highlight/highlight.service");
const search_user_dto_1 = require("./dto/search-user.dto");
let UserController = class UserController {
    userService;
    followService;
    banService;
    postService;
    storyService;
    higlightService;
    constructor(userService, followService, banService, postService, storyService, higlightService) {
        this.userService = userService;
        this.followService = followService;
        this.banService = banService;
        this.postService = postService;
        this.storyService = storyService;
        this.higlightService = higlightService;
    }
    listFollower(id) {
        return this.followService.listFollower(id);
    }
    searchUser(query) {
        return this.userService.searchUser(query);
    }
    listFollowing(id) {
        return this.followService.listFollowing(id);
    }
    updateUsername(body, id) {
        return this.userService.updateUsername(id, body);
    }
    updateStatus(id, body) {
        return this.userService.updateStatus(id, body);
    }
    updateEmail(id, body) {
        return this.userService.updateEmail(id, body);
    }
    banRequest(id) {
        return this.banService.banRequest(id);
    }
    unBanRequest(id) {
        return this.banService.unBanRequest(id);
    }
    banList(id) {
        return this.banService.banList(id);
    }
    userPosts(id, query) {
        return this.postService.userPosts(id, query);
    }
    myList(id, query) {
        return this.storyService.myList(query);
    }
    myStoryActiveList(id) {
        return this.storyService.myStoryActiveList();
    }
    userStoryActiveList(id) {
        return this.storyService.userStoryActiveList(id);
    }
    highlightList(id) {
        return this.higlightService.highlightList(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(":id/followers"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Follow.entity").FollowEntity] }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "listFollower", null);
__decorate([
    (0, common_1.Get)("search"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/User.entity").UserEntity] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_user_dto_1.SearchUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "searchUser", null);
__decorate([
    (0, common_1.Get)(":id/followings"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Follow.entity").FollowEntity] }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "listFollowing", null);
__decorate([
    (0, common_1.Patch)(':id/username'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_username_dto_1.UpdateUsernameDto, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUsername", null);
__decorate([
    (0, common_1.Patch)(":id/status"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(":id/email"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_email_dto_1.UpdateEmailDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateEmail", null);
__decorate([
    (0, common_1.Post)(":id/ban"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "banRequest", null);
__decorate([
    (0, common_1.Post)(":id/unban"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "unBanRequest", null);
__decorate([
    (0, common_1.Get)(":id/ban"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Ban.entity").BanEntity] }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "banList", null);
__decorate([
    (0, common_1.Get)(":id/posts"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Post.entity").PostEntity] }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "userPosts", null);
__decorate([
    (0, common_1.Get)(":id/story/all"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Story.entity").StoryEntity] }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "myList", null);
__decorate([
    (0, common_1.Get)(":id/story/active/me"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Story.entity").StoryEntity] }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "myStoryActiveList", null);
__decorate([
    (0, common_1.Get)(":id/story"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Story.entity").StoryEntity] }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "userStoryActiveList", null);
__decorate([
    (0, common_1.Get)(":id/highlights"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Highlight.entity").HighlightEntity] }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "highlightList", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        follow_service_1.FollowService,
        ban_service_1.BanService,
        post_service_1.PostService,
        story_service_1.StoryService,
        highlight_service_1.HighlightService])
], UserController);
//# sourceMappingURL=user.controller.js.map