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
exports.PostEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Media_entity_1 = require("./Media.entity");
const PostAction_entity_1 = require("./PostAction.entity");
const PostComment_entity_1 = require("./PostComment.entity");
let PostEntity = class PostEntity extends typeorm_1.BaseEntity {
    id;
    content;
    isActive;
    userId;
    like;
    view;
    commentCount;
    shared;
    createdAt;
    updatedAt;
    user;
    media;
    actions;
    comments;
    taggedUsers;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, content: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, userId: { required: true, type: () => Number }, like: { required: true, type: () => Number }, view: { required: true, type: () => Number }, commentCount: { required: true, type: () => Number }, shared: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, user: { required: true, type: () => require("./User.entity").UserEntity }, media: { required: true, type: () => [require("./Media.entity").MediaEntity] }, actions: { required: true, type: () => [require("./PostAction.entity").PostActionEntity] }, comments: { required: true, type: () => [require("./PostComment.entity").PostCommentEntity] }, taggedUsers: { required: true, type: () => [require("./User.entity").UserEntity] } };
    }
};
exports.PostEntity = PostEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PostEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PostEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PostEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEntity.prototype, "like", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEntity.prototype, "view", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEntity.prototype, "commentCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEntity.prototype, "shared", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PostEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PostEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.posts, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], PostEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Media_entity_1.MediaEntity, (media) => media.post),
    __metadata("design:type", Array)
], PostEntity.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostAction_entity_1.PostActionEntity, (action) => action.post),
    __metadata("design:type", Array)
], PostEntity.prototype, "actions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostComment_entity_1.PostCommentEntity, (comment) => comment.post),
    __metadata("design:type", Array)
], PostEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_entity_1.UserEntity),
    (0, typeorm_1.JoinTable)({
        name: "post_tagged_users",
        joinColumn: {
            name: "postId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "userId",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], PostEntity.prototype, "taggedUsers", void 0);
exports.PostEntity = PostEntity = __decorate([
    (0, typeorm_1.Entity)('posts')
], PostEntity);
//# sourceMappingURL=Post.entity.js.map