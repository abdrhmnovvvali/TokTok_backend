import { BaseEntity } from "typeorm";
import { PostEntity } from "./Post.entity";
import { MediaTypes } from "src/shared/enums/Media.enum";
import { StoryEntity } from "./Story.entity";
export declare class MediaEntity extends BaseEntity {
    id: string;
    url: string;
    postId: number;
    storyId: number;
    type: MediaTypes;
    post: PostEntity;
    story: StoryEntity;
}
