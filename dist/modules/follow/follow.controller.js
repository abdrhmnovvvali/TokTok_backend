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
exports.FollowController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const follow_service_1 = require("./follow.service");
const Auth_guard_1 = require("../../shared/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
const follow_request_dto_1 = require("./dto/follow-request.dto");
let FollowController = class FollowController {
    followService;
    constructor(followService) {
        this.followService = followService;
    }
    followRequest(body) {
        return this.followService.followRequest(body);
    }
    acceptRequest(body) {
        return this.followService.acceptRequest(body);
    }
    pendingRequests() {
        return this.followService.pendingRequests();
    }
    removeFollower(body) {
        return this.followService.removeFollower(body);
    }
    removeFollowing(body) {
        return this.followService.removeFollowing(body);
    }
};
exports.FollowController = FollowController;
__decorate([
    (0, common_1.Post)('request'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_request_dto_1.FollowRequestDto]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "followRequest", null);
__decorate([
    (0, common_1.Post)('accept_request'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_request_dto_1.AcceptRequestDto]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "acceptRequest", null);
__decorate([
    (0, common_1.Get)("pending_requests"),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Follow.entity").FollowEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "pendingRequests", null);
__decorate([
    (0, common_1.Post)("remove_follower"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_request_dto_1.RemoveFollowerDto]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "removeFollower", null);
__decorate([
    (0, common_1.Post)("remove_following"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_request_dto_1.RemoveFollowingDto]),
    __metadata("design:returntype", void 0)
], FollowController.prototype, "removeFollowing", null);
exports.FollowController = FollowController = __decorate([
    (0, common_1.Controller)('follow'),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
//# sourceMappingURL=follow.controller.js.map