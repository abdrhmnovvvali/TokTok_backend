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
exports.PostController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const Auth_guard_1 = require("../../shared/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_post_dto_1 = require("./dto/create-post.dto");
const pagination_dto_1 = require("../../shared/dto/pagination.dto");
let PostController = class PostController {
    postService;
    constructor(postService) {
        this.postService = postService;
    }
    myPosts(query) {
        return this.postService.myPosts(query);
    }
    feed(query) {
        return this.postService.feed(query);
    }
    listArchive(query) {
        return this.postService.listArchive(query);
    }
    item(id) {
        return this.postService.item(id);
    }
    createPost(body) {
        return this.postService.createPost(body);
    }
    deletePost(id) {
        return this.postService.deletePost(id);
    }
    toggleArchive(id) {
        return this.postService.toggleArchive(id);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)('me'),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Post.entity").PostEntity] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "myPosts", null);
__decorate([
    (0, common_1.Get)("feed"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Post.entity").PostEntity] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "feed", null);
__decorate([
    (0, common_1.Get)("archive"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Post.entity").PostEntity] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "listArchive", null);
__decorate([
    (0, common_1.Get)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entity/Post.entity").PostEntity }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "item", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Delete)(":id"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)(":id/archive"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "toggleArchive", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('post'),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map