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
exports.StoryActionEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Story_entity_1 = require("./Story.entity");
const Story_enum_1 = require("../../shared/enums/Story.enum");
let StoryActionEntity = class StoryActionEntity extends typeorm_1.BaseEntity {
    id;
    action;
    userId;
    storyId;
    user;
    story;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, action: { required: true, enum: require("../../shared/enums/Story.enum").StoryActionTypes }, userId: { required: true, type: () => Number }, storyId: { required: true, type: () => Number }, user: { required: true, type: () => require("./User.entity").UserEntity }, story: { required: true, type: () => require("./Story.entity").StoryEntity }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.StoryActionEntity = StoryActionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StoryActionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Story_enum_1.StoryActionTypes }),
    __metadata("design:type", String)
], StoryActionEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StoryActionEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StoryActionEntity.prototype, "storyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.storyActions, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], StoryActionEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Story_entity_1.StoryEntity, (story) => story.actions, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "storyId" }),
    __metadata("design:type", Story_entity_1.StoryEntity)
], StoryActionEntity.prototype, "story", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StoryActionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], StoryActionEntity.prototype, "updatedAt", void 0);
exports.StoryActionEntity = StoryActionEntity = __decorate([
    (0, typeorm_1.Entity)("story_actions")
], StoryActionEntity);
//# sourceMappingURL=StoryAction.entity.js.map