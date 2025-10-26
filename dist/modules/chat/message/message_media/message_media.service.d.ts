import { MessageMediaEntity } from "src/database/entity/MessageMedia.entity";
import { CloudinaryService } from "src/libs/cloudinary/cloudinary.service";
import { DataSource } from "typeorm";
export declare class MessageMediaService {
    private dataSource;
    private cloudinaryService;
    private messageMediaRepo;
    constructor(dataSource: DataSource, cloudinaryService: CloudinaryService);
    uploadVoice(file: Express.Multer.File): Promise<MessageMediaEntity>;
    uploadMedia(file: Express.Multer.File): Promise<MessageMediaEntity>;
}
