import { MessageMediaService } from "./message_media.service";
export declare class MessageMediaController {
    private messageMediaService;
    constructor(messageMediaService: MessageMediaService);
    uploadImage(file: Express.Multer.File): Promise<import("../../../../database/entity/MessageMedia.entity").MessageMediaEntity>;
    uploadVoice(file: Express.Multer.File): Promise<import("../../../../database/entity/MessageMedia.entity").MessageMediaEntity>;
}
