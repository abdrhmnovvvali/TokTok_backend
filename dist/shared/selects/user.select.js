"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicUserSelect = void 0;
const profile_select_1 = require("./profile.select");
exports.BasicUserSelect = {
    id: true,
    username: true,
    isPrivate: true,
    profile: profile_select_1.BasicProfileSelect
};
//# sourceMappingURL=user.select.js.map