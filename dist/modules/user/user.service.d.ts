import { UserEntity } from "src/database/entity/User.entity";
import { DataSource } from "typeorm";
import { UpdateUsernameDto } from "./dto/update-username.dto";
import { ClsService } from "nestjs-cls";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { FollowService } from "../follow/follow.service";
import { SearchUserDto } from "./dto/search-user.dto";
export declare class UserService {
    private dataSource;
    private cls;
    private mailService;
    private followService;
    private userRepo;
    constructor(dataSource: DataSource, cls: ClsService, mailService: MailerService, followService: FollowService);
    findUser(id: number): Promise<UserEntity>;
    findUsers(ids: number[]): Promise<UserEntity[]>;
    getPrivateUsers(ids: number[]): Promise<UserEntity[]>;
    searchUser(params: SearchUserDto): Promise<UserEntity[]>;
    suggetionsUsername(username: string): Promise<string[]>;
    checkUsername(username: string): Promise<boolean>;
    updateUsername(id: number, params: UpdateUsernameDto): Promise<{
        message: string;
    }>;
    updateStatus(id: number, params: UpdateStatusDto): Promise<{
        message: string;
    }>;
    updateEmail(id: number, params: UpdateEmailDto): Promise<{
        message: string;
    }>;
    updateProfessionalAccount(): void;
    incrementReportCount(id: number): Promise<boolean>;
}
