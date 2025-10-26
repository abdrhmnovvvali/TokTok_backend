import { ReportService } from "./report.service";
import { CreateReportDto } from "./dto/create-report.dto";
export declare class ReportController {
    private reportService;
    constructor(reportService: ReportService);
    report(body: CreateReportDto): Promise<{
        message: string;
    }>;
}
