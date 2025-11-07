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
exports.StoryEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Media_entity_1 = require("./Media.entity");
const StoryAction_entity_1 = require("./StoryAction.entity");
let StoryEntity = class StoryEntity extends typeorm_1.BaseEntity {
    id;
    userId;
    user;
    media;
    view;
    isView;
    createdAt;
    isActive;
    actions;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, user: { required: true, type: () => require("./User.entity").UserEntity }, media: { required: true, type: () => require("./Media.entity").MediaEntity }, view: { required: true, type: () => Number }, isView: { required: false, type: () => Boolean }, createdAt: { required: true, type: () => Date }, isActive: { required: true, type: () => Boolean }, actions: { required: true, type: () => [require("./StoryAction.entity").StoryActionEntity] } };
    }
};
exports.StoryEntity = StoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StoryEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.stories, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], StoryEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Media_entity_1.MediaEntity, (media) => media.story),
    __metadata("design:type", Media_entity_1.MediaEntity)
], StoryEntity.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], StoryEntity.prototype, "view", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], StoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], StoryEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StoryAction_entity_1.StoryActionEntity, (action) => action.story),
    __metadata("design:type", Array)
], StoryEntity.prototype, "actions", void 0);
exports.StoryEntity = StoryEntity = __decorate([
    (0, typeorm_1.Entity)("stories")
], StoryEntity);
//# sourceMappingURL=Story.entity.js.map