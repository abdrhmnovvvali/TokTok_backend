import { ClsService } from "nestjs-cls";
import { FollowEntity } from "src/database/entity/Follow.entity";
import { DataSource } from "typeorm";
import { AcceptRequestDto, FollowRequestDto, RemoveFollowerDto, RemoveFollowingDto } from "./dto/follow-request.dto";
import { FollowStatusEnum } from "src/shared/enums/Follow.enum";
import { UserService } from "../user/user.service";
import { ProfileService } from "../user/profile/profile.service";
import { BanService } from "../ban/ban.service";
import { NotificationService } from "../notification/notification.service";
export declare class FollowService {
    private dataSource;
    private cls;
    private userService;
    private profileService;
    private banService;
    private notificationService;
    private followRepo;
    constructor(dataSource: DataSource, cls: ClsService, userService: UserService, profileService: ProfileService, banService: BanService, notificationService: NotificationService);
    checkStatus(fromId: number, toId: number): Promise<false | FollowStatusEnum>;
    listFollower(id: number): Promise<FollowEntity[]>;
    listFollowing(id: number): Promise<FollowEntity[]>;
    followRequest(params: FollowRequestDto): Promise<{
        message: string;
    }>;
    pendingRequests(): Promise<FollowEntity[]>;
    checkFollow(from: number, to: number): Promise<boolean>;
    acceptRequest(params: AcceptRequestDto): Promise<{
        message: string;
    }>;
    acceptAllPendingRequests(): Promise<boolean>;
    removeFollower(params: RemoveFollowerDto): Promise<{
        message: string;
    }>;
    removeFollowing(params: RemoveFollowingDto): Promise<{
        message: string;
    }>;
    getUsersWithoutAccess(userIds: number[]): Promise<number[]>;
}
