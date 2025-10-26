import { PostActionService } from "./post_action.service";
export declare class PostActionController {
    private PostActionService;
    constructor(PostActionService: PostActionService);
    likePost(id: number): Promise<{
        message: string;
    }>;
    sharePost(id: number): Promise<{
        message: string;
    }>;
}
