declare class StoryMediaDto {
    id: string;
    url: string;
}
declare class StoryDto {
    id: number;
    media: StoryMediaDto;
    view: number;
    createdAt: Date;
    isActive: boolean;
    isView: boolean;
    userId: number;
}
declare class UserProfileImageDto {
    id: number;
    url: string;
}
declare class UserProfileDto {
    id: number;
    image: UserProfileImageDto | null;
}
declare class UserDto {
    id: number;
    username: string;
    profile: UserProfileDto;
}
export declare class StoryFeedItemDto {
    data: StoryDto[];
    user: UserDto;
}
export {};
