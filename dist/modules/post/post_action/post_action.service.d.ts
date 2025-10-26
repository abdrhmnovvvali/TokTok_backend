import { ClsService } from "nestjs-cls";
import { DataSource } from "typeorm";
import { PostService } from "../post.service";
import { FollowService } from "src/modules/follow/follow.service";
import { UserService } from "src/modules/user/user.service";
import { BanService } from "src/modules/ban/ban.service";
import { NotificationService } from "src/modules/notification/notification.service";
export declare class PostActionService {
    private dataSource;
    private cls;
    private postService;
    private followService;
    private userService;
    private banService;
    private notificationService;
    private actionRepo;
    constructor(dataSource: DataSource, cls: ClsService, postService: PostService, followService: FollowService, userService: UserService, banService: BanService, notificationService: NotificationService);
    likePost(id: number): Promise<{
        message: string;
    }>;
    sharedPost(id: number): Promise<{
        message: string;
    }>;
    viewPost(id: number): Promise<boolean>;
}
