import { HighlightService } from "./highlight.service";
import { CretaeHighlightDto } from "./dto/create-highlight.dto";
import { HighlightStoryDto } from "./dto/create-highlight-story.dto";
export declare class HighlightController {
    private highlightService;
    constructor(highlightService: HighlightService);
    item(id: number): Promise<import("../../database/entity/Highlight.entity").HighlightEntity>;
    add(id: number, body: HighlightStoryDto): Promise<{
        message: string;
    }>;
    remove(id: number, body: HighlightStoryDto): Promise<{
        message: string;
    }>;
    createHighlight(body: CretaeHighlightDto): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
