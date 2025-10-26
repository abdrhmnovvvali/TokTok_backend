"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const follow_module_1 = require("../follow/follow.module");
const ban_module_1 = require("../ban/ban.module");
const post_module_1 = require("../post/post.module");
const story_module_1 = require("../story/story.module");
const highlight_module_1 = require("../highlight/highlight.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => follow_module_1.FollowModule), ban_module_1.BanModule, (0, common_1.forwardRef)(() => post_module_1.PostModule), story_module_1.StoryModule, highlight_module_1.HighlightModule],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map