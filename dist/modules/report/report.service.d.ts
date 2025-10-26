import { DataSource } from "typeorm";
import { CreateReportDto } from "./dto/create-report.dto";
import { ClsService } from "nestjs-cls";
import { UserService } from "../user/user.service";
export declare class ReportService {
    private dataSource;
    private cls;
    private userService;
    private reportRepo;
    constructor(dataSource: DataSource, cls: ClsService, userService: UserService);
    report(params: CreateReportDto): Promise<{
        message: string;
    }>;
}
