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
exports.PostActionEntity = void 0;
const openapi = require("@nestjs/swagger");
const Post_enum_1 = require("../../shared/enums/Post.enum");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Post_entity_1 = require("./Post.entity");
let PostActionEntity = class PostActionEntity extends typeorm_1.BaseEntity {
    id;
    action;
    userId;
    postId;
    user;
    post;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, action: { required: true, enum: require("../../shared/enums/Post.enum").PostActionTypes }, userId: { required: true, type: () => Number }, postId: { required: true, type: () => Number }, user: { required: true, type: () => require("./User.entity").UserEntity }, post: { required: true, type: () => require("./Post.entity").PostEntity } };
    }
};
exports.PostActionEntity = PostActionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PostActionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Post_enum_1.PostActionTypes }),
    __metadata("design:type", String)
], PostActionEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PostActionEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PostActionEntity.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.postActions, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], PostActionEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_entity_1.PostEntity, (post) => post.actions, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "postId" }),
    __metadata("design:type", Post_entity_1.PostEntity)
], PostActionEntity.prototype, "post", void 0);
exports.PostActionEntity = PostActionEntity = __decorate([
    (0, typeorm_1.Entity)("post_actions")
], PostActionEntity);
//# sourceMappingURL=PostAction.entity.js.map