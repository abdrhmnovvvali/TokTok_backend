export declare const PendingRequestsSelect: {
    id: boolean;
    status: boolean;
    from: {
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
export declare const FollowersSelect: {
    id: boolean;
    from: {
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
export declare const FollowingsSelect: {
    id: boolean;
    to: {
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
