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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryFeedItemDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class StoryMediaDto {
    id;
    url;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, url: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoryMediaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoryMediaDto.prototype, "url", void 0);
class StoryDto {
    id;
    media;
    view;
    createdAt;
    isActive;
    isView;
    userId;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, media: { required: true, type: () => StoryMediaDto }, view: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, isActive: { required: true, type: () => Boolean }, isView: { required: true, type: () => Boolean }, userId: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: StoryMediaDto }),
    __metadata("design:type", StoryMediaDto)
], StoryDto.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoryDto.prototype, "view", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], StoryDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], StoryDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], StoryDto.prototype, "isView", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoryDto.prototype, "userId", void 0);
class UserProfileImageDto {
    id;
    url;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, url: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserProfileImageDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserProfileImageDto.prototype, "url", void 0);
class UserProfileDto {
    id;
    image;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, image: { required: true, type: () => UserProfileImageDto, nullable: true } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserProfileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserProfileImageDto, nullable: true }),
    __metadata("design:type", Object)
], UserProfileDto.prototype, "image", void 0);
class UserDto {
    id;
    username;
    profile;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, username: { required: true, type: () => String }, profile: { required: true, type: () => UserProfileDto } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserProfileDto }),
    __metadata("design:type", UserProfileDto)
], UserDto.prototype, "profile", void 0);
class StoryFeedItemDto {
    data;
    user;
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [StoryDto] }, user: { required: true, type: () => UserDto } };
    }
}
exports.StoryFeedItemDto = StoryFeedItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StoryDto] }),
    __metadata("design:type", Array)
], StoryFeedItemDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserDto }),
    __metadata("design:type", UserDto)
], StoryFeedItemDto.prototype, "user", void 0);
//# sourceMappingURL=story-feed-response.dto.js.map