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
exports.MediaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const media_service_1 = require("./media.service");
const Auth_guard_1 = require("../../shared/guards/Auth.guard");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const upload_media_dto_1 = require("./dto/upload-media.dto");
const media_filter_1 = require("./media.filter");
const media_constants_1 = require("../../shared/constants/media.constants");
let MediaController = class MediaController {
    mediaService;
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    uploadImage(files) {
        return this.mediaService.uploadFiles(files);
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: media_filter_1.mediaFileFilter,
        limits: {
            fileSize: media_constants_1.UPLOAD_MEDIA_MAX_SIZE,
        },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: upload_media_dto_1.UploadMediaDto }),
    openapi.ApiResponse({ status: 201, type: [require("../../database/entity/Media.entity").MediaEntity] }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "uploadImage", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)("media"),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map