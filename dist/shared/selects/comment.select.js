"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSelect = void 0;
const user_select_1 = require("./user.select");
exports.CommentSelect = {};
exports.CommentSelect.id = true;
exports.CommentSelect.content = true;
exports.CommentSelect.user = user_select_1.BasicUserSelect;
exports.CommentSelect.parentCommentId = true;
exports.CommentSelect.replies = exports.CommentSelect;
exports.CommentSelect.replyCount = true;
exports.CommentSelect.likesCount = true;
exports.CommentSelect.createdAt = true;
exports.CommentSelect.updatedAt = true;
//# sourceMappingURL=comment.select.js.map