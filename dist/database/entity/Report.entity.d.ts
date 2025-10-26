import { BaseEntity } from "typeorm";
export declare class ReportEntity extends BaseEntity {
    id: number;
    from: number;
    to: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
