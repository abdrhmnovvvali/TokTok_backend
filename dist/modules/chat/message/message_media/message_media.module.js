"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageMediaModule = void 0;
const common_1 = require("@nestjs/common");
const message_media_service_1 = require("./message_media.service");
const message_media_controller_1 = require("./message_media.controller");
const cloudinary_module_1 = require("../../../../libs/cloudinary/cloudinary.module");
let MessageMediaModule = class MessageMediaModule {
};
exports.MessageMediaModule = MessageMediaModule;
exports.MessageMediaModule = MessageMediaModule = __decorate([
    (0, common_1.Module)({
        imports: [cloudinary_module_1.CloudinaryModule],
        controllers: [message_media_controller_1.MessageMediaController],
        providers: [message_media_service_1.MessageMediaService],
        exports: [message_media_service_1.MessageMediaService]
    })
], MessageMediaModule);
//# sourceMappingURL=message_media.module.js.map