import { BanEntity } from "src/database/entity/Ban.entity";
import { DataSource } from "typeorm";
import { UserService } from "../user/user.service";
import { ClsService } from "nestjs-cls";
import { FollowService } from "../follow/follow.service";
export declare class BanService {
    private dataSource;
    private userService;
    private cls;
    private followService;
    private banRepo;
    constructor(dataSource: DataSource, userService: UserService, cls: ClsService, followService: FollowService);
    banRequest(id: number): Promise<{
        message: string;
    }>;
    unBanRequest(id: number): Promise<{
        message: string;
    }>;
    banList(id: number): Promise<BanEntity[]>;
    checkBan(userOne: number, userTwo: number): Promise<boolean>;
    getBannedUsers(userIds: number[]): Promise<number[]>;
}
