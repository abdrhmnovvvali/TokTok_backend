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
exports.MediaEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Post_entity_1 = require("./Post.entity");
const Media_enum_1 = require("../../shared/enums/Media.enum");
const Story_entity_1 = require("./Story.entity");
let MediaEntity = class MediaEntity extends typeorm_1.BaseEntity {
    id;
    url;
    postId;
    storyId;
    type;
    post;
    story;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, url: { required: true, type: () => String }, postId: { required: true, type: () => Number }, storyId: { required: true, type: () => Number }, type: { required: true, enum: require("../../shared/enums/Media.enum").MediaTypes }, post: { required: true, type: () => require("./Post.entity").PostEntity }, story: { required: true, type: () => require("./Story.entity").StoryEntity } };
    }
};
exports.MediaEntity = MediaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], MediaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], MediaEntity.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], MediaEntity.prototype, "storyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Media_enum_1.MediaTypes }),
    __metadata("design:type", String)
], MediaEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_entity_1.PostEntity, (post) => post.media, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "postId" }),
    __metadata("design:type", Post_entity_1.PostEntity)
], MediaEntity.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Story_entity_1.StoryEntity, (story) => story.media, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "storyId" }),
    __metadata("design:type", Story_entity_1.StoryEntity)
], MediaEntity.prototype, "story", void 0);
exports.MediaEntity = MediaEntity = __decorate([
    (0, typeorm_1.Entity)("media")
], MediaEntity);
//# sourceMappingURL=Media.entity.js.map