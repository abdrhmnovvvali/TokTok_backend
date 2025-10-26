import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { HighlightStoryEntity } from "./HighlightStory.entity";
export declare class HighlightEntity extends BaseEntity {
    id: number;
    userId: number;
    user: UserEntity;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    highlightStories: HighlightStoryEntity[];
}
