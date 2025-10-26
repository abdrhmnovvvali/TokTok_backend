"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsSelect = void 0;
const user_select_1 = require("./user.select");
exports.PostsSelect = {
    id: true,
    content: true,
    isActive: true,
    like: true,
    view: true,
    commentCount: true,
    createdAt: true,
    shared: true,
    updatedAt: true,
    media: {
        id: true,
        url: true
    },
    taggedUsers: {
        id: true,
        username: true
    },
    user: user_select_1.BasicUserSelect
};
//# sourceMappingURL=post.selects.js.map