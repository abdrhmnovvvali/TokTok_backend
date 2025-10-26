import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    myPosts(query: PaginationDto): Promise<import("../../database/entity/Post.entity").PostEntity[]>;
    feed(query: PaginationDto): Promise<import("../../database/entity/Post.entity").PostEntity[]>;
    listArchive(query: PaginationDto): Promise<import("../../database/entity/Post.entity").PostEntity[]>;
    item(id: number): Promise<import("../../database/entity/Post.entity").PostEntity>;
    createPost(body: CreatePostDto): Promise<{
        message: string;
    }>;
    deletePost(id: number): Promise<{
        message: string;
    }>;
    toggleArchive(id: number): Promise<{
        message: string;
    }>;
}
