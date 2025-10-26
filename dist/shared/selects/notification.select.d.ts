export declare const NotificationSelect: {
    id: boolean;
    userId: boolean;
    sender: {
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
    post: {
        id: boolean;
        media: {
            id: boolean;
            url: boolean;
        };
    };
    comment: {
        id: boolean;
        content: boolean;
    };
    story: {
        id: boolean;
        media: {
            id: boolean;
            url: boolean;
        };
    };
    type: boolean;
    message: boolean;
    read: boolean;
    createdAt: boolean;
};
