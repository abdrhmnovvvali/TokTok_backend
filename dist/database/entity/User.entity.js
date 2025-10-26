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
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const bcrypt_1 = require("bcrypt");
const User_enum_1 = require("../../shared/enums/User.enum");
const typeorm_1 = require("typeorm");
const Profile_entity_1 = require("./Profile.entity");
const Follow_entity_1 = require("./Follow.entity");
const Ban_entity_1 = require("./Ban.entity");
const Post_entity_1 = require("./Post.entity");
const PostAction_entity_1 = require("./PostAction.entity");
const PostComment_entity_1 = require("./PostComment.entity");
const CommentLike_entity_1 = require("./CommentLike.entity");
const Story_entity_1 = require("./Story.entity");
const Highlight_entity_1 = require("./Highlight.entity");
const StoryAction_entity_1 = require("./StoryAction.entity");
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
    id;
    username;
    email;
    phone;
    password;
    isPrivate;
    provider;
    providerId;
    reportCount;
    isReport;
    createdAt;
    updatedAt;
    async beforeUpsert() {
        if (!this.password)
            return;
        this.password = await (0, bcrypt_1.hash)(this.password, 10);
    }
    profile;
    following;
    follower;
    bannedUsers;
    bannedBy;
    posts;
    postActions;
    comments;
    commentLikes;
    taggedInPosts;
    stories;
    highlights;
    storyActions;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, username: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, password: { required: true, type: () => String }, isPrivate: { required: true, type: () => Boolean }, provider: { required: true, enum: require("../../shared/enums/User.enum").UserProvider }, providerId: { required: true, type: () => String }, reportCount: { required: true, type: () => Number }, isReport: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, profile: { required: true, type: () => require("./Profile.entity").ProfileEntity }, following: { required: true, type: () => [require("./Follow.entity").FollowEntity] }, follower: { required: true, type: () => [require("./Follow.entity").FollowEntity] }, bannedUsers: { required: true, type: () => [require("./Ban.entity").BanEntity] }, bannedBy: { required: true, type: () => [require("./Ban.entity").BanEntity] }, posts: { required: true, type: () => [require("./Post.entity").PostEntity] }, postActions: { required: true, type: () => [require("./PostAction.entity").PostActionEntity] }, comments: { required: true, type: () => [require("./PostComment.entity").PostCommentEntity] }, commentLikes: { required: true, type: () => [require("./CommentLike.entity").CommentLikeEntity] }, taggedInPosts: { required: true, type: () => [require("./Post.entity").PostEntity] }, stories: { required: true, type: () => [require("./Story.entity").StoryEntity] }, highlights: { required: true, type: () => [require("./Highlight.entity").HighlightEntity] }, storyActions: { required: true, type: () => [require("./StoryAction.entity").StoryActionEntity] } };
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isPrivate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: User_enum_1.UserProvider, default: User_enum_1.UserProvider.LOCAL }),
    __metadata("design:type", String)
], UserEntity.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "reportCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isReport", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "beforeUpsert", null);
__decorate([
    (0, typeorm_1.OneToOne)(() => Profile_entity_1.ProfileEntity, (item) => item.user, { cascade: true }),
    __metadata("design:type", Profile_entity_1.ProfileEntity)
], UserEntity.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Follow_entity_1.FollowEntity, (follow) => follow.from),
    __metadata("design:type", Array)
], UserEntity.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Follow_entity_1.FollowEntity, (follow) => follow.to),
    __metadata("design:type", Array)
], UserEntity.prototype, "follower", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Ban_entity_1.BanEntity, ban => ban.from),
    __metadata("design:type", Array)
], UserEntity.prototype, "bannedUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Ban_entity_1.BanEntity, ban => ban.to),
    __metadata("design:type", Array)
], UserEntity.prototype, "bannedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Post_entity_1.PostEntity, (post) => post.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostAction_entity_1.PostActionEntity, (action) => action.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "postActions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostComment_entity_1.PostCommentEntity, (comment) => comment.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CommentLike_entity_1.CommentLikeEntity, (like) => like.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "commentLikes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Post_entity_1.PostEntity, post => post.taggedUsers),
    __metadata("design:type", Array)
], UserEntity.prototype, "taggedInPosts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Story_entity_1.StoryEntity, (story) => story.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "stories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Highlight_entity_1.HighlightEntity, (highlight) => highlight.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "highlights", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StoryAction_entity_1.StoryActionEntity, (action) => action.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "storyActions", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], UserEntity);
//# sourceMappingURL=User.entity.js.map