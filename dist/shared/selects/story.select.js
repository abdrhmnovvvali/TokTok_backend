"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryFolowingsSelect = exports.MyStorySelect = exports.StoryListSelect = void 0;
exports.StoryListSelect = {
    id: true,
    media: {
        id: true,
        url: true
    },
    view: true,
    createdAt: true,
    isActive: true
};
exports.MyStorySelect = {
    ...exports.StoryListSelect,
    actions: {
        id: true,
        action: true,
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
        }
    }
};
exports.StoryFolowingsSelect = {
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
    userId: true,
    ...exports.StoryListSelect
};
//# sourceMappingURL=story.select.js.map