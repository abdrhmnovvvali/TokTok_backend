import { ProfileService } from "./profile.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    updateProfile(id: number, file: Express.Multer.File, body: UpdateProfileDto): Promise<{
        message: string;
    }>;
    myProfile(): Promise<import("../../../database/entity/Profile.entity").ProfileEntity>;
    getProfile(id: number): Promise<{
        profile: import("../../../database/entity/Profile.entity").ProfileEntity | null;
        isFollowing: string | false;
    }>;
}
