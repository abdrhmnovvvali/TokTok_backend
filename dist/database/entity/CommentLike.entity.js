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
exports.CommentLikeEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const PostComment_entity_1 = require("./PostComment.entity");
let CommentLikeEntity = class CommentLikeEntity extends typeorm_1.BaseEntity {
    id;
    userId;
    user;
    commentId;
    comment;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, user: { required: true, type: () => require("./User.entity").UserEntity }, commentId: { required: true, type: () => Number }, comment: { required: true, type: () => require("./PostComment.entity").PostCommentEntity }, createdAt: { required: true, type: () => Date } };
    }
};
exports.CommentLikeEntity = CommentLikeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CommentLikeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CommentLikeEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, user => user.commentLikes, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], CommentLikeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CommentLikeEntity.prototype, "commentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PostComment_entity_1.PostCommentEntity, comment => comment.likes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "commentId" }),
    __metadata("design:type", PostComment_entity_1.PostCommentEntity)
], CommentLikeEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CommentLikeEntity.prototype, "createdAt", void 0);
exports.CommentLikeEntity = CommentLikeEntity = __decorate([
    (0, typeorm_1.Entity)("comment_likes")
], CommentLikeEntity);
//# sourceMappingURL=CommentLike.entity.js.map