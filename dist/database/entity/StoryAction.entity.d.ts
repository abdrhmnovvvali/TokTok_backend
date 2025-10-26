import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { StoryEntity } from "./Story.entity";
import { StoryActionTypes } from "src/shared/enums/Story.enum";
export declare class StoryActionEntity extends BaseEntity {
    id: number;
    action: StoryActionTypes;
    userId: number;
    storyId: number;
    user: UserEntity;
    story: StoryEntity;
    createdAt: Date;
    updatedAt: Date;
}
