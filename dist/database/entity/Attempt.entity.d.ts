import { UserAttemptType } from "src/shared/enums/User.enum";
import { BaseEntity } from "typeorm";
export declare class AttemptEntity extends BaseEntity {
    id: number;
    userId: number;
    type: UserAttemptType;
    attempt: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class LoginAttemptEntity extends BaseEntity {
    id: number;
    ip: string;
    userId: number;
    createdAt: Date;
}
