export declare const MessageSelect: {
    id: boolean;
    content: boolean;
    isDeleted: boolean;
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
    media: {
        id: boolean;
        url: boolean;
        type: boolean;
    };
    createdAt: boolean;
    updatedAt: boolean;
};
