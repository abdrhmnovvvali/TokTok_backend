import { PostEntity } from "src/database/entity/Post.entity";
import { DataSource } from "typeorm";
import { UserService } from "../user/user.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { ClsService } from "nestjs-cls";
import { ProfileService } from "../user/profile/profile.service";
import { FollowService } from "../follow/follow.service";
import { BanService } from "../ban/ban.service";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { PostActionService } from "./post_action/post_action.service";
import { NotificationService } from "../notification/notification.service";
export declare class PostService {
    private dataSource;
    private userService;
    private profileService;
    private followService;
    private banService;
    private postActionService;
    private cls;
    private notificationService;
    private postRepo;
    constructor(dataSource: DataSource, userService: UserService, profileService: ProfileService, followService: FollowService, banService: BanService, postActionService: PostActionService, cls: ClsService, notificationService: NotificationService);
    feed(params: PaginationDto): Promise<PostEntity[]>;
    createPost(params: CreatePostDto): Promise<{
        message: string;
    }>;
    findPost(id: number): Promise<PostEntity>;
    item(id: number): Promise<PostEntity>;
    myPosts(params: PaginationDto): Promise<PostEntity[]>;
    userPosts(id: number, params: PaginationDto): Promise<PostEntity[]>;
    deletePost(id: number): Promise<{
        message: string;
    }>;
    listArchive(params: PaginationDto): Promise<PostEntity[]>;
    toggleArchive(id: number): Promise<{
        message: string;
    }>;
    incrementField(postId: number, field: 'like' | 'view' | 'commentCount' | 'shared', value: number): Promise<void>;
}
