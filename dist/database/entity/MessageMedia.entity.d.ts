import { MessageMediaTypes } from "src/shared/enums/Media.enum";
import { BaseEntity } from "typeorm";
import { MessageEntity } from "./Message.entity";
export declare class MessageMediaEntity extends BaseEntity {
    id: string;
    url: string;
    messageId: number;
    type: MessageMediaTypes;
    message: MessageEntity;
}
