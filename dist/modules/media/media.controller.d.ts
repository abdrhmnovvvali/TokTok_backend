import { MediaService } from "./media.service";
export declare class MediaController {
    private mediaService;
    constructor(mediaService: MediaService);
    uploadImage(files: Express.Multer.File[]): Promise<import("../../database/entity/Media.entity").MediaEntity[]>;
}
