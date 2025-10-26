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
exports.MessageMediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const MessageMedia_entity_1 = require("../../../../database/entity/MessageMedia.entity");
const cloudinary_service_1 = require("../../../../libs/cloudinary/cloudinary.service");
const Media_enum_1 = require("../../../../shared/enums/Media.enum");
const typeorm_2 = require("typeorm");
let MessageMediaService = class MessageMediaService {
    dataSource;
    cloudinaryService;
    messageMediaRepo;
    constructor(dataSource, cloudinaryService) {
        this.dataSource = dataSource;
        this.cloudinaryService = cloudinaryService;
        this.messageMediaRepo = this.dataSource.getRepository(MessageMedia_entity_1.MessageMediaEntity);
    }
    async uploadVoice(file) {
        try {
            let result = await this.cloudinaryService.uploadFile(file);
            if (!result?.url)
                throw new Error();
            let media = this.messageMediaRepo.create({
                url: result.url,
                type: Media_enum_1.MessageMediaTypes.AUDIO
            });
            await media.save();
            return media;
        }
        catch {
            throw new common_1.BadRequestException('Something went wrong');
        }
    }
    async uploadMedia(file) {
        try {
            let result = await this.cloudinaryService.uploadFile(file);
            if (!result?.url)
                throw new Error();
            let media = this.messageMediaRepo.create({
                url: result.url,
                type: result.type.includes('video') ? Media_enum_1.MessageMediaTypes.VIDEO : Media_enum_1.MessageMediaTypes.IMAGE,
            });
            await media.save();
            return media;
        }
        catch {
            throw new common_1.BadRequestException('Something went wrong');
        }
    }
};
exports.MessageMediaService = MessageMediaService;
exports.MessageMediaService = MessageMediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        cloudinary_service_1.CloudinaryService])
], MessageMediaService);
//# sourceMappingURL=message_media.service.js.map