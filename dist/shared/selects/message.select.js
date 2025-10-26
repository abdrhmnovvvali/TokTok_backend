"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSelect = void 0;
exports.MessageSelect = {
    id: true,
    content: true,
    isDeleted: true,
    user: {
        id: true,
        username: true,
        profile: {
            id: true,
            image: {
                id: true,
                url: true
            }
        }
    },
    media: {
        id: true,
        url: true,
        type: true
    },
    createdAt: true,
    updatedAt: true
};
//# sourceMappingURL=message.select.js.map