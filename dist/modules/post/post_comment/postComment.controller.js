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
exports.PostCommentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const postComment_service_1 = require("./postComment.service");
const Auth_guard_1 = require("../../../shared/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
const post_comment_create_dto_1 = require("./dto/post-comment-create.dto");
const pagination_dto_1 = require("../../../shared/dto/pagination.dto");
const post_comment_update_dto_1 = require("./dto/post-comment-update.dto");
let PostCommentController = class PostCommentController {
    postCommentService;
    constructor(postCommentService) {
        this.postCommentService = postCommentService;
    }
    list(id, query) {
        return this.postCommentService.list(id, query);
    }
    create(id, body) {
        return this.postCommentService.create(id, body);
    }
    like(id, commentId) {
        return this.postCommentService.like(commentId);
    }
    update(id, commentId, body) {
        return this.postCommentService.update(commentId, body);
    }
    delete(id, commentId) {
        return this.postCommentService.delete(id, commentId);
    }
};
exports.PostCommentController = PostCommentController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../../database/entity/PostComment.entity").PostCommentEntity] }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PostCommentController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, post_comment_create_dto_1.CommentCreateDto]),
    __metadata("design:returntype", void 0)
], PostCommentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(":commentId/like"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("commentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PostCommentController.prototype, "like", null);
__decorate([
    (0, common_1.Patch)(":commentId/edit"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("commentId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, post_comment_update_dto_1.CommentUpdateDto]),
    __metadata("design:returntype", void 0)
], PostCommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":commentId"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("commentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PostCommentController.prototype, "delete", null);
exports.PostCommentController = PostCommentController = __decorate([
    (0, common_1.Controller)("post/:id/comment"),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [postComment_service_1.PostCommentService])
], PostCommentController);
//# sourceMappingURL=postComment.controller.js.map