import { BaseEntity } from "typeorm";
export declare class OtpEntity extends BaseEntity {
    id: number;
    userId: number;
    code: string;
    token: string;
    expireTime: Date;
}
