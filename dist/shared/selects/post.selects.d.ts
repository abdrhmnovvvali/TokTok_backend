export declare const PostsSelect: {
    id: boolean;
    content: boolean;
    isActive: boolean;
    like: boolean;
    view: boolean;
    commentCount: boolean;
    createdAt: boolean;
    shared: boolean;
    updatedAt: boolean;
    media: {
        id: boolean;
        url: boolean;
    };
    taggedUsers: {
        id: boolean;
        username: boolean;
    };
    user: {
        id: boolean;
        username: boolean;
        isPrivate: boolean;
        profile: {
            id: boolean;
            image: {
                id: boolean;
                url: boolean;
            };
        };
    };
};
