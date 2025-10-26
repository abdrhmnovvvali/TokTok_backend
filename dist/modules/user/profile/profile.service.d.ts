import { ProfileEntity } from "src/database/entity/Profile.entity";
import { DataSource } from "typeorm";
import { UserService } from "../user.service";
import { ClsService } from "nestjs-cls";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { FollowService } from "src/modules/follow/follow.service";
import { BanService } from "src/modules/ban/ban.service";
export declare class ProfileService {
    private dataSource;
    private userService;
    private cls;
    private followService;
    private banService;
    private profileRepo;
    constructor(dataSource: DataSource, userService: UserService, cls: ClsService, followService: FollowService, banService: BanService);
    updateProfile(id: number, params: UpdateProfileDto): Promise<{
        message: string;
    }>;
    getMyProfile(): Promise<ProfileEntity>;
    getProfile(id: number): Promise<{
        profile: ProfileEntity | null;
        isFollowing: string | false;
    }>;
    incrementField(id: number, field: 'follower' | 'following' | 'postCount', value: number): Promise<void>;
}
