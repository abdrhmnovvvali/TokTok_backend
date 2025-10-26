import { FollowStatusEnum } from "src/shared/enums/Follow.enum";
import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
export declare class FollowEntity extends BaseEntity {
    id: number;
    status: FollowStatusEnum;
    fromId: number;
    toId: number;
    from: UserEntity;
    to: UserEntity;
    createdAt: Date;
    updatedAt: Date;
}
