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
exports.HighlightController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const highlight_service_1 = require("./highlight.service");
const Auth_guard_1 = require("../../shared/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
const create_highlight_dto_1 = require("./dto/create-highlight.dto");
const create_highlight_story_dto_1 = require("./dto/create-highlight-story.dto");
let HighlightController = class HighlightController {
    highlightService;
    constructor(highlightService) {
        this.highlightService = highlightService;
    }
    item(id) {
        return this.highlightService.item(id);
    }
    add(id, body) {
        return this.highlightService.add(id, body);
    }
    remove(id, body) {
        return this.highlightService.remove(id, body);
    }
    createHighlight(body) {
        return this.highlightService.createHighlight(body);
    }
    delete(id) {
        return this.highlightService.delete(id);
    }
};
exports.HighlightController = HighlightController;
__decorate([
    (0, common_1.Get)(":id"),
    openapi.ApiResponse({ status: 200, type: require("../../database/entity/Highlight.entity").HighlightEntity }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HighlightController.prototype, "item", null);
__decorate([
    (0, common_1.Post)(":id/add"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_highlight_story_dto_1.HighlightStoryDto]),
    __metadata("design:returntype", void 0)
], HighlightController.prototype, "add", null);
__decorate([
    (0, common_1.Post)(":id/remove"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_highlight_story_dto_1.HighlightStoryDto]),
    __metadata("design:returntype", void 0)
], HighlightController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("new"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_highlight_dto_1.CretaeHighlightDto]),
    __metadata("design:returntype", void 0)
], HighlightController.prototype, "createHighlight", null);
__decorate([
    (0, common_1.Delete)(":id"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HighlightController.prototype, "delete", null);
exports.HighlightController = HighlightController = __decorate([
    (0, common_1.Controller)("highlight"),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [highlight_service_1.HighlightService])
], HighlightController);
//# sourceMappingURL=highlight.controller.js.map