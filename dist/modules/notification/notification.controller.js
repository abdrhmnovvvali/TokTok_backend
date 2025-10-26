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
exports.NotificationController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const Auth_guard_1 = require("../../shared/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
const pagination_dto_1 = require("../../shared/dto/pagination.dto");
const update_notification_dto_1 = require("./dto/update-notification.dto");
let NotificationController = class NotificationController {
    notificationService;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    list(query) {
        return this.notificationService.list(query);
    }
    item(id) {
        return this.notificationService.item(id);
    }
    updateNotifications(body) {
        return this.notificationService.updateNotifications(body);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../database/entity/Notification.entity").NotificationEntity] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entity/Notification.entity").NotificationEntity }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "item", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_notification_dto_1.UpdateNotificationDto]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "updateNotifications", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)('notification'),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map