import { StoryEntity } from "src/database/entity/Story.entity";
import { DataSource } from "typeorm";
import { CreateStoryDto } from "./dto/create-story.dto";
import { ClsService } from "nestjs-cls";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { FollowService } from "../follow/follow.service";
import { BanService } from "../ban/ban.service";
import { UserService } from "../user/user.service";
import { NotificationService } from "../notification/notification.service";
export declare class StoryService {
    private dataSource;
    private cls;
    private followService;
    private banService;
    private userService;
    private notificationService;
    private storyRepo;
    private storyActionRepo;
    constructor(dataSource: DataSource, cls: ClsService, followService: FollowService, banService: BanService, userService: UserService, notificationService: NotificationService);
    findStory(userId: number, storyId: number): Promise<StoryEntity>;
    create(params: CreateStoryDto): Promise<{
        message: string;
    }>;
    myList(params: PaginationDto): Promise<StoryEntity[]>;
    myStoryActiveList(): Promise<StoryEntity[]>;
    userStoryActiveList(id: number): Promise<StoryEntity[]>;
    myFollowerStoryList(): Promise<{
        data: any;
        user: any;
    }[]>;
    deleteStory(id: number): Promise<{
        message: string;
    }>;
    likeStory(id: number): Promise<{
        message: string;
    }>;
    viewStory(id: number): Promise<{
        message: string;
    }>;
    private attachIsViewFlag;
}
