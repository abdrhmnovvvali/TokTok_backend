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
exports.PostActionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const post_action_service_1 = require("./post_action.service");
const Auth_guard_1 = require("../../../shared/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
let PostActionController = class PostActionController {
    PostActionService;
    constructor(PostActionService) {
        this.PostActionService = PostActionService;
    }
    likePost(id) {
        return this.PostActionService.likePost(id);
    }
    sharePost(id) {
        return this.PostActionService.sharedPost(id);
    }
};
exports.PostActionController = PostActionController;
__decorate([
    (0, common_1.Post)("like"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostActionController.prototype, "likePost", null);
__decorate([
    (0, common_1.Post)("share"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostActionController.prototype, "sharePost", null);
exports.PostActionController = PostActionController = __decorate([
    (0, common_1.Controller)("post/:id/action"),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [post_action_service_1.PostActionService])
], PostActionController);
//# sourceMappingURL=post_action.controller.js.map