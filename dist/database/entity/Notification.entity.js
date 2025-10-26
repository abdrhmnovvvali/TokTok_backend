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
exports.NotificationEntity = void 0;
const openapi = require("@nestjs/swagger");
const Notification_enum_1 = require("../../shared/enums/Notification.enum");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Post_entity_1 = require("./Post.entity");
const Story_entity_1 = require("./Story.entity");
const PostComment_entity_1 = require("./PostComment.entity");
let NotificationEntity = class NotificationEntity extends typeorm_1.BaseEntity {
    id;
    userId;
    user;
    senderId;
    sender;
    type;
    message;
    postId;
    post;
    storyId;
    story;
    commentId;
    comment;
    read;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, user: { required: true, type: () => require("./User.entity").UserEntity }, senderId: { required: true, type: () => Number }, sender: { required: true, type: () => require("./User.entity").UserEntity }, type: { required: true, enum: require("../../shared/enums/Notification.enum").NotificationEnum }, message: { required: true, type: () => String }, postId: { required: true, type: () => Number }, post: { required: true, type: () => require("./Post.entity").PostEntity }, storyId: { required: true, type: () => Number }, story: { required: true, type: () => require("./Story.entity").StoryEntity }, commentId: { required: true, type: () => Number }, comment: { required: true, type: () => require("./PostComment.entity").PostCommentEntity }, read: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date } };
    }
};
exports.NotificationEntity = NotificationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], NotificationEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "senderId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], NotificationEntity.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Notification_enum_1.NotificationEnum }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_entity_1.PostEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'postId' }),
    __metadata("design:type", Post_entity_1.PostEntity)
], NotificationEntity.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "storyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Story_entity_1.StoryEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'storyId' }),
    __metadata("design:type", Story_entity_1.StoryEntity)
], NotificationEntity.prototype, "story", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationEntity.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PostComment_entity_1.PostCommentEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'commentId' }),
    __metadata("design:type", PostComment_entity_1.PostCommentEntity)
], NotificationEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], NotificationEntity.prototype, "read", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NotificationEntity.prototype, "createdAt", void 0);
exports.NotificationEntity = NotificationEntity = __decorate([
    (0, typeorm_1.Entity)("notifications")
], NotificationEntity);
//# sourceMappingURL=Notification.entity.js.map