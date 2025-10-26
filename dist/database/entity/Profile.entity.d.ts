import { BaseEntity } from "typeorm";
import { UserEntity } from "./User.entity";
import { ImageEntity } from "./Image.entity";
export declare class ProfileEntity extends BaseEntity {
    id: number;
    fullName: string;
    birth: string;
    occupation: string;
    bio: string;
    follower: number;
    following: number;
    postCount: number;
    userId: number;
    user: UserEntity;
    imageId: string;
    image: ImageEntity;
}
