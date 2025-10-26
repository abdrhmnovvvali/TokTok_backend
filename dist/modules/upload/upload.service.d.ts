import { ImageEntity } from "src/database/entity/Image.entity";
import { CloudinaryService } from "src/libs/cloudinary/cloudinary.service";
import { DataSource } from "typeorm";
export declare class UploadService {
    private dataSource;
    private cloudinaryService;
    private imageRepo;
    constructor(dataSource: DataSource, cloudinaryService: CloudinaryService);
    uploadImage(file: Express.Multer.File): Promise<ImageEntity>;
}
