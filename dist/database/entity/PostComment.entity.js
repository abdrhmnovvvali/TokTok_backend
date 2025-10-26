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
exports.PostCommentEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Post_entity_1 = require("./Post.entity");
const CommentLike_entity_1 = require("./CommentLike.entity");
let PostCommentEntity = class PostCommentEntity extends typeorm_1.BaseEntity {
    id;
    content;
    userId;
    user;
    postId;
    post;
    parentCommentId;
    parentComment;
    replies;
    likes;
    replyCount;
    likesCount;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, content: { required: true, type: () => String }, userId: { required: true, type: () => Number }, user: { required: true, type: () => require("./User.entity").UserEntity }, postId: { required: true, type: () => Number }, post: { required: true, type: () => require("./Post.entity").PostEntity }, parentCommentId: { required: true, type: () => Number }, parentComment: { required: true, type: () => require("./PostComment.entity").PostCommentEntity }, replies: { required: true, type: () => [require("./PostComment.entity").PostCommentEntity] }, likes: { required: true, type: () => [require("./CommentLike.entity").CommentLikeEntity] }, replyCount: { required: true, type: () => Number }, likesCount: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.PostCommentEntity = PostCommentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PostCommentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PostCommentEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PostCommentEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, user => user.comments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], PostCommentEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PostCommentEntity.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_entity_1.PostEntity, post => post.comments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "postId" }),
    __metadata("design:type", Post_entity_1.PostEntity)
], PostCommentEntity.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PostCommentEntity.prototype, "parentCommentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PostCommentEntity, comment => comment.replies),
    (0, typeorm_1.JoinColumn)({ name: "parentCommentId" }),
    __metadata("design:type", PostCommentEntity)
], PostCommentEntity.prototype, "parentComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostCommentEntity, comment => comment.parentComment),
    __metadata("design:type", Array)
], PostCommentEntity.prototype, "replies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CommentLike_entity_1.CommentLikeEntity, like => like.comment),
    __metadata("design:type", Array)
], PostCommentEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostCommentEntity.prototype, "replyCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostCommentEntity.prototype, "likesCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PostCommentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PostCommentEntity.prototype, "updatedAt", void 0);
exports.PostCommentEntity = PostCommentEntity = __decorate([
    (0, typeorm_1.Entity)("post_comments")
], PostCommentEntity);
//# sourceMappingURL=PostComment.entity.js.map