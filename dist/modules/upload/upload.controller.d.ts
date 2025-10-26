import { UploadService } from "./upload.service";
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    uploadImage(file: Express.Multer.File): Promise<import("../../database/entity/Image.entity").ImageEntity>;
}
