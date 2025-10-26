import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { MediaEntity } from "./Media.entity";
import { StoryActionEntity } from "./StoryAction.entity";
export declare class StoryEntity extends BaseEntity {
    id: number;
    userId: number;
    user: UserEntity;
    media: MediaEntity;
    view: number;
    createdAt: Date;
    isActive: boolean;
    actions: StoryActionEntity[];
}
