"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostActionModule = void 0;
const common_1 = require("@nestjs/common");
const post_action_controller_1 = require("./post_action.controller");
const post_action_service_1 = require("./post_action.service");
const post_module_1 = require("../post.module");
const follow_module_1 = require("../../follow/follow.module");
const ban_module_1 = require("../../ban/ban.module");
const notification_module_1 = require("../../notification/notification.module");
let PostActionModule = class PostActionModule {
};
exports.PostActionModule = PostActionModule;
exports.PostActionModule = PostActionModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => post_module_1.PostModule), follow_module_1.FollowModule, ban_module_1.BanModule, notification_module_1.NotificationModule],
        controllers: [post_action_controller_1.PostActionController],
        providers: [post_action_service_1.PostActionService],
        exports: [post_action_service_1.PostActionService]
    })
], PostActionModule);
//# sourceMappingURL=post_action.module.js.map