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
exports.MessageController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const Auth_guard_1 = require("../../../shared/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../../../shared/dto/pagination.dto");
let MessageController = class MessageController {
    messageService;
    constructor(messageService) {
        this.messageService = messageService;
    }
    chatMessages(chatId, query) {
        return this.messageService.chatMessages(chatId, query);
    }
    createMessage(chatId, body) {
        return this.messageService.createMessage(chatId, body);
    }
    deleteMessage(chatId, id) {
        return this.messageService.deleteMessage(chatId, id);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../../database/entity/Message.entity").MessageEntity] }),
    __param(0, (0, common_1.Param)("chatId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "chatMessages", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../../database/entity/Message.entity").MessageEntity }),
    __param(0, (0, common_1.Param)("chatId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("chatId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "deleteMessage", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)("chat/:chatId/message"),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map