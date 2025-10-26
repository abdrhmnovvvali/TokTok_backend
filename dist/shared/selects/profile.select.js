"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicProfileSelect = exports.ProfileSelect = exports.MyProfileSelect = void 0;
exports.MyProfileSelect = {
    id: true,
    fullName: true,
    birth: true,
    occupation: true,
    bio: true,
    follower: true,
    following: true,
    postCount: true,
    image: {
        id: true,
        url: true,
        createdAt: true,
        updatedAt: true
    },
    user: {
        id: true,
        username: true,
        email: true,
        phone: true,
        isPrivate: true
    }
};
exports.ProfileSelect = {
    id: true,
    fullName: true,
    birth: true,
    occupation: true,
    bio: true,
    follower: true,
    following: true,
    postCount: true,
    image: {
        id: true,
        url: true,
        createdAt: true,
        updatedAt: true
    },
    user: {
        id: true,
        username: true,
        isPrivate: true
    }
};
exports.BasicProfileSelect = {
    id: true,
    image: {
        id: true,
        url: true
    }
};
//# sourceMappingURL=profile.select.js.map