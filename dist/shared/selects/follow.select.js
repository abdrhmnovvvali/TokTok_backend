"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowingsSelect = exports.FollowersSelect = exports.PendingRequestsSelect = void 0;
const user_select_1 = require("./user.select");
exports.PendingRequestsSelect = {
    id: true,
    status: true,
    from: user_select_1.BasicUserSelect
};
exports.FollowersSelect = {
    id: true,
    from: user_select_1.BasicUserSelect
};
exports.FollowingsSelect = {
    id: true,
    to: user_select_1.BasicUserSelect
};
//# sourceMappingURL=follow.select.js.map