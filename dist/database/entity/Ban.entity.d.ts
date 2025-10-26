import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
export declare class BanEntity extends BaseEntity {
    id: number;
    fromId: number;
    toId: number;
    createdAt: Date;
    updatedAt: Date;
    from: UserEntity;
    to: UserEntity;
}
