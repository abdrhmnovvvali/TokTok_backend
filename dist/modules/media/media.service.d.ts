import { MediaEntity } from 'src/database/entity/Media.entity';
import { CloudinaryService } from 'src/libs/cloudinary/cloudinary.service';
import { DataSource } from 'typeorm';
export declare class MediaService {
    private cloudinaryService;
    private dataSource;
    private mediaRepo;
    constructor(cloudinaryService: CloudinaryService, dataSource: DataSource);
    uploadFiles(files: Express.Multer.File[]): Promise<MediaEntity[]>;
}
