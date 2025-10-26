import { UserService } from "./user.service";
import { UpdateUsernameDto } from "./dto/update-username.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { FollowService } from "../follow/follow.service";
import { BanService } from "../ban/ban.service";
import { PostService } from "../post/post.service";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { StoryService } from "../story/story.service";
import { HighlightService } from "../highlight/highlight.service";
import { SearchUserDto } from "./dto/search-user.dto";
export declare class UserController {
    private userService;
    private followService;
    private banService;
    private postService;
    private storyService;
    private higlightService;
    constructor(userService: UserService, followService: FollowService, banService: BanService, postService: PostService, storyService: StoryService, higlightService: HighlightService);
    listFollower(id: number): Promise<import("../../database/entity/Follow.entity").FollowEntity[]>;
    searchUser(query: SearchUserDto): Promise<import("../../database/entity/User.entity").UserEntity[]>;
    listFollowing(id: number): Promise<import("../../database/entity/Follow.entity").FollowEntity[]>;
    updateUsername(body: UpdateUsernameDto, id: number): Promise<{
        message: string;
    }>;
    updateStatus(id: number, body: UpdateStatusDto): Promise<{
        message: string;
    }>;
    updateEmail(id: number, body: UpdateEmailDto): Promise<{
        message: string;
    }>;
    banRequest(id: number): Promise<{
        message: string;
    }>;
    unBanRequest(id: number): Promise<{
        message: string;
    }>;
    banList(id: number): Promise<import("../../database/entity/Ban.entity").BanEntity[]>;
    userPosts(id: number, query: PaginationDto): Promise<import("../../database/entity/Post.entity").PostEntity[]>;
    myList(id: number, query: PaginationDto): Promise<import("../../database/entity/Story.entity").StoryEntity[]>;
    myStoryActiveList(id: number): Promise<import("../../database/entity/Story.entity").StoryEntity[]>;
    userStoryActiveList(id: number): Promise<import("../../database/entity/Story.entity").StoryEntity[]>;
    highlightList(id: number): Promise<import("../../database/entity/Highlight.entity").HighlightEntity[]>;
}
