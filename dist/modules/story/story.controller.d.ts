import { StoryService } from "./story.service";
import { CreateStoryDto } from "./dto/create-story.dto";
export declare class StoryController {
    private storyService;
    constructor(storyService: StoryService);
    myFollowerStoryList(): Promise<{
        data: any;
        user: any;
    }[]>;
    create(body: CreateStoryDto): Promise<{
        message: string;
    }>;
    likeStory(id: number): Promise<{
        message: string;
    }>;
    viewStory(id: number): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
