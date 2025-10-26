import { PostCommentService } from "./postComment.service";
import { CommentCreateDto } from "./dto/post-comment-create.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { CommentUpdateDto } from "./dto/post-comment-update.dto";
export declare class PostCommentController {
    private postCommentService;
    constructor(postCommentService: PostCommentService);
    list(id: number, query: PaginationDto): Promise<import("../../../database/entity/PostComment.entity").PostCommentEntity[]>;
    create(id: number, body: CommentCreateDto): Promise<{
        message: string;
    }>;
    like(id: number, commentId: number): Promise<{
        message: string;
    }>;
    update(id: number, commentId: number, body: CommentUpdateDto): Promise<{
        message: string;
    }>;
    delete(id: number, commentId: number): Promise<{
        message: string;
    }>;
}
