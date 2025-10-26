import { ClsService } from "nestjs-cls";
import { PostCommentEntity } from "src/database/entity/PostComment.entity";
import { UserService } from "src/modules/user/user.service";
import { DataSource } from "typeorm";
import { PostService } from "../post.service";
import { CommentCreateDto } from "./dto/post-comment-create.dto";
import { BanService } from "src/modules/ban/ban.service";
import { FollowService } from "src/modules/follow/follow.service";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { CommentUpdateDto } from "./dto/post-comment-update.dto";
import { NotificationService } from "src/modules/notification/notification.service";
export declare class PostCommentService {
    private dataSource;
    private cls;
    private userService;
    private postService;
    private banService;
    private followService;
    private notificationService;
    private postCommentRepo;
    private postCommentLikeRepo;
    constructor(dataSource: DataSource, cls: ClsService, userService: UserService, postService: PostService, banService: BanService, followService: FollowService, notificationService: NotificationService);
    list(id: number, params: PaginationDto): Promise<PostCommentEntity[]>;
    create(id: number, params: CommentCreateDto): Promise<{
        message: string;
    }>;
    like(commentId: number): Promise<{
        message: string;
    }>;
    update(commentId: number, params: CommentUpdateDto): Promise<{
        message: string;
    }>;
    delete(postId: number, commentId: number): Promise<{
        message: string;
    }>;
    incrementField(id: number, field: "replyCount" | "likesCount", value: number): Promise<void>;
}
