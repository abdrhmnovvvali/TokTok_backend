"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCommentModule = void 0;
const common_1 = require("@nestjs/common");
const postComment_controller_1 = require("./postComment.controller");
const postComment_service_1 = require("./postComment.service");
const post_module_1 = require("../post.module");
const follow_module_1 = require("../../follow/follow.module");
const ban_module_1 = require("../../ban/ban.module");
const notification_module_1 = require("../../notification/notification.module");
let PostCommentModule = class PostCommentModule {
};
exports.PostCommentModule = PostCommentModule;
exports.PostCommentModule = PostCommentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => post_module_1.PostModule),
            (0, common_1.forwardRef)(() => follow_module_1.FollowModule),
            (0, common_1.forwardRef)(() => ban_module_1.BanModule),
            notification_module_1.NotificationModule
        ],
        controllers: [postComment_controller_1.PostCommentController],
        providers: [postComment_service_1.PostCommentService]
    })
], PostCommentModule);
//# sourceMappingURL=postComment.module.js.map