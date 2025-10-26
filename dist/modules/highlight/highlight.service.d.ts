import { CretaeHighlightDto } from "./dto/create-highlight.dto";
import { DataSource } from "typeorm";
import { HighlightEntity } from "src/database/entity/Highlight.entity";
import { ClsService } from "nestjs-cls";
import { StoryService } from "../story/story.service";
import { UserService } from "../user/user.service";
import { BanService } from "../ban/ban.service";
import { FollowService } from "../follow/follow.service";
import { HighlightStoryDto } from "./dto/create-highlight-story.dto";
export declare class HighlightService {
    private dataSource;
    private cls;
    private storyService;
    private userService;
    private banService;
    private followService;
    private highlightRepo;
    private highlightStoryRepo;
    constructor(dataSource: DataSource, cls: ClsService, storyService: StoryService, userService: UserService, banService: BanService, followService: FollowService);
    item(id: number): Promise<HighlightEntity>;
    highlightList(id: number): Promise<HighlightEntity[]>;
    createHighlight(params: CretaeHighlightDto): Promise<{
        message: string;
    }>;
    add(id: number, params: HighlightStoryDto): Promise<{
        message: string;
    }>;
    remove(id: number, params: HighlightStoryDto): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
