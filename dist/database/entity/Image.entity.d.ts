import { BaseEntity } from "typeorm";
export declare class ImageEntity extends BaseEntity {
    id: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}
