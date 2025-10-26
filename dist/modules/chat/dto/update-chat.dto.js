"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChatDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_chat_group_dto_1 = require("./create-chat-group.dto");
class UpdateChatDto extends (0, swagger_1.PartialType)(create_chat_group_dto_1.CreateChatGroupDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateChatDto = UpdateChatDto;
//# sourceMappingURL=update-chat.dto.js.map