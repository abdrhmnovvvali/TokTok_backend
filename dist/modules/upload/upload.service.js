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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Image_entity_1 = require("../../database/entity/Image.entity");
const cloudinary_service_1 = require("../../libs/cloudinary/cloudinary.service");
const typeorm_2 = require("typeorm");
let UploadService = class UploadService {
    dataSource;
    cloudinaryService;
    imageRepo;
    constructor(dataSource, cloudinaryService) {
        this.dataSource = dataSource;
        this.cloudinaryService = cloudinaryService;
        this.imageRepo = this.dataSource.getRepository(Image_entity_1.ImageEntity);
    }
    async uploadImage(file) {
        try {
            let result = await this.cloudinaryService.uploadFile(file);
            if (!result?.url)
                throw new Error();
            let image = this.imageRepo.create({
                url: result.url,
            });
            await image.save();
            return image;
        }
        catch {
            throw new common_1.BadRequestException('Something went wrong');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        cloudinary_service_1.CloudinaryService])
], UploadService);
//# sourceMappingURL=upload.service.js.map