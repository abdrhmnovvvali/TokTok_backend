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
exports.MessageMediaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const message_media_service_1 = require("./message_media.service");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const create_message_media_dto_1 = require("./dto/create-message-media.dto");
const multer_1 = require("multer");
let MessageMediaController = class MessageMediaController {
    messageMediaService;
    constructor(messageMediaService) {
        this.messageMediaService = messageMediaService;
    }
    uploadImage(file) {
        return this.messageMediaService.uploadMedia(file);
    }
    async uploadVoice(file) {
        return this.messageMediaService.uploadVoice(file);
    }
};
exports.MessageMediaController = MessageMediaController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('media', {
        storage: (0, multer_1.memoryStorage)()
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: create_message_media_dto_1.UploadMessageMediaDto }),
    openapi.ApiResponse({ status: 201, type: require("../../../../database/entity/MessageMedia.entity").MessageMediaEntity }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessageMediaController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('upload-voice'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('voice', {
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.startsWith("audio/")) {
                return cb(new Error("Only audio files are allowed!"), false);
            }
            cb(null, true);
        }
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: create_message_media_dto_1.UploadMessageVoiceDto }),
    openapi.ApiResponse({ status: 201, type: require("../../../../database/entity/MessageMedia.entity").MessageMediaEntity }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageMediaController.prototype, "uploadVoice", null);
exports.MessageMediaController = MessageMediaController = __decorate([
    (0, common_1.Controller)("message/media"),
    __metadata("design:paramtypes", [message_media_service_1.MessageMediaService])
], MessageMediaController);
//# sourceMappingURL=message_media.controller.js.map