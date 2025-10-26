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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Media_entity_1 = require("../../database/entity/Media.entity");
const cloudinary_service_1 = require("../../libs/cloudinary/cloudinary.service");
const Media_enum_1 = require("../../shared/enums/Media.enum");
const typeorm_2 = require("typeorm");
let MediaService = class MediaService {
    cloudinaryService;
    dataSource;
    mediaRepo;
    constructor(cloudinaryService, dataSource) {
        this.cloudinaryService = cloudinaryService;
        this.dataSource = dataSource;
        this.mediaRepo = this.dataSource.getRepository(Media_entity_1.MediaEntity);
    }
    async uploadFiles(files) {
        let promises = files.map(this.cloudinaryService.uploadFile);
        let result = await Promise.all(promises);
        let media = result.map((item) => this.mediaRepo.create({
            type: item.type.includes('video') ? Media_enum_1.MediaTypes.VIDEO : Media_enum_1.MediaTypes.IMAGE,
            url: item.url,
        }));
        return await this.mediaRepo.save(media);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        typeorm_2.DataSource])
], MediaService);
//# sourceMappingURL=media.service.js.map