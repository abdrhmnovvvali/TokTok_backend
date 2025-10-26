"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Report_entity_1 = require("../../database/entity/Report.entity");
const typeorm_2 = require("typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const user_service_1 = require("../user/user.service");
let ReportService = class ReportService {
    dataSource;
    cls;
    userService;
    reportRepo;
    constructor(dataSource, cls, userService) {
        this.dataSource = dataSource;
        this.cls = cls;
        this.userService = userService;
        this.reportRepo = this.dataSource.getRepository(Report_entity_1.ReportEntity);
    }
    async report(params) {
        let myUser = this.cls.get("user");
        let user = await this.userService.findUser(params.to);
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        let checkReport = await this.reportRepo.exists({
            where: {
                from: myUser.id,
                to: user.id
            }
        });
        if (checkReport) {
            throw new common_1.BadRequestException("Report is already exists");
        }
        let report = this.reportRepo.create({
            from: myUser.id,
            to: user.id,
            text: params.text
        });
        await report.save();
        await this.userService.incrementReportCount(user.id);
        return {
            message: "Report is created successfully"
        };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        nestjs_cls_1.ClsService,
        user_service_1.UserService])
], ReportService);
//# sourceMappingURL=report.service.js.map