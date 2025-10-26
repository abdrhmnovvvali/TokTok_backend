import { FollowService } from "./follow.service";
import { AcceptRequestDto, FollowRequestDto, RemoveFollowerDto, RemoveFollowingDto } from "./dto/follow-request.dto";
export declare class FollowController {
    private followService;
    constructor(followService: FollowService);
    followRequest(body: FollowRequestDto): Promise<{
        message: string;
    }>;
    acceptRequest(body: AcceptRequestDto): Promise<{
        message: string;
    }>;
    pendingRequests(): Promise<import("../../database/entity/Follow.entity").FollowEntity[]>;
    removeFollower(body: RemoveFollowerDto): Promise<{
        message: string;
    }>;
    removeFollowing(body: RemoveFollowingDto): Promise<{
        message: string;
    }>;
}
