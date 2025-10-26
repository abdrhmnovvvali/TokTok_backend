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
exports.HighlightEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const HighlightStory_entity_1 = require("./HighlightStory.entity");
let HighlightEntity = class HighlightEntity extends typeorm_1.BaseEntity {
    id;
    userId;
    user;
    name;
    createdAt;
    updatedAt;
    highlightStories;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, user: { required: true, type: () => require("./User.entity").UserEntity }, name: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, highlightStories: { required: true, type: () => [require("./HighlightStory.entity").HighlightStoryEntity] } };
    }
};
exports.HighlightEntity = HighlightEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HighlightEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HighlightEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.highlights, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], HighlightEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HighlightEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HighlightEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], HighlightEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HighlightStory_entity_1.HighlightStoryEntity, (highlightStory) => highlightStory.highlight),
    __metadata("design:type", Array)
], HighlightEntity.prototype, "highlightStories", void 0);
exports.HighlightEntity = HighlightEntity = __decorate([
    (0, typeorm_1.Entity)('highlights')
], HighlightEntity);
//# sourceMappingURL=Highlight.entity.js.map