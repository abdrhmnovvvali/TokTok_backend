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
exports.ChatController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const Auth_guard_1 = require("../../shared/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_chat_dto_1 = require("./dto/create-chat.dto");
const pagination_dto_1 = require("../../shared/dto/pagination.dto");
const create_chat_group_dto_1 = require("./dto/create-chat-group.dto");
const update_chat_dto_1 = require("./dto/update-chat.dto");
let ChatController = class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    chatList(query) {
        return this.chatService.chatList(query);
    }
    getItem(id) {
        return this.chatService.getItem(id);
    }
    chatRequestList(query) {
        return this.chatService.chatRequestList(query);
    }
    createSingleChat(body) {
        return this.chatService.createSingleChat(body);
    }
    group(body) {
        return this.chatService.createChatGroup(body);
    }
    updateGroup(id, body) {
        return this.chatService.updateGroup(id, body);
    }
    leaveGroup(id) {
        return this.chatService.leaveGroup(id);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "chatList", null);
__decorate([
    (0, common_1.Get)(":id"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getItem", null);
__decorate([
    (0, common_1.Get)("request"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "chatRequestList", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateSingleChatDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "createSingleChat", null);
__decorate([
    (0, common_1.Post)("group"),
    openapi.ApiResponse({ status: 201, type: require("../../database/entity/Chat.entity").ChatEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_group_dto_1.CreateChatGroupDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "group", null);
__decorate([
    (0, common_1.Post)(":id/update"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_chat_dto_1.UpdateChatDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "updateGroup", null);
__decorate([
    (0, common_1.Post)(":id/leave"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "leaveGroup", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)("chat"),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map