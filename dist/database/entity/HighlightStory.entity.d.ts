import { BaseEntity } from "typeorm";
import { StoryEntity } from "./Story.entity";
import { HighlightEntity } from "./Highlight.entity";
export declare class HighlightStoryEntity extends BaseEntity {
    id: number;
    highlightId: number;
    storyId: number;
    highlight: HighlightEntity;
    story: StoryEntity;
}
