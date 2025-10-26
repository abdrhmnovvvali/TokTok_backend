"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
const profile_module_1 = require("../user/profile/profile.module");
const follow_module_1 = require("../follow/follow.module");
const ban_module_1 = require("../ban/ban.module");
const post_action_module_1 = require("./post_action/post_action.module");
const postComment_module_1 = require("./post_comment/postComment.module");
const notification_module_1 = require("../notification/notification.module");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => profile_module_1.ProfileModule),
            (0, common_1.forwardRef)(() => follow_module_1.FollowModule),
            (0, common_1.forwardRef)(() => ban_module_1.BanModule),
            (0, common_1.forwardRef)(() => post_action_module_1.PostActionModule),
            (0, common_1.forwardRef)(() => postComment_module_1.PostCommentModule),
            notification_module_1.NotificationModule
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService],
        exports: [post_service_1.PostService]
    })
], PostModule);
//# sourceMappingURL=post.module.js.map