export declare const StoryListSelect: {
    id: boolean;
    media: {
        id: boolean;
        url: boolean;
    };
    view: boolean;
    createdAt: boolean;
    isActive: boolean;
};
export declare const MyStorySelect: {
    actions: {
        id: boolean;
        action: boolean;
        user: {
            id: boolean;
            username: boolean;
            profile: {
                id: boolean;
                image: {
                    id: boolean;
                    url: boolean;
                };
            };
        };
    };
    id: boolean;
    media: {
        id: boolean;
        url: boolean;
    };
    view: boolean;
    createdAt: boolean;
    isActive: boolean;
};
export declare const StoryFolowingsSelect: {
    id: boolean;
    media: {
        id: boolean;
        url: boolean;
    };
    view: boolean;
    createdAt: boolean;
    isActive: boolean;
    user: {
        id: boolean;
        username: boolean;
        profile: {
            id: boolean;
            image: {
                id: boolean;
                url: boolean;
            };
        };
    };
    userId: boolean;
};
