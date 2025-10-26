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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const date_fns_1 = require("date-fns");
const Attempt_entity_1 = require("../database/entity/Attempt.entity");
const Otp_entity_1 = require("../database/entity/Otp.entity");
const Report_entity_1 = require("../database/entity/Report.entity");
const Story_entity_1 = require("../database/entity/Story.entity");
const User_entity_1 = require("../database/entity/User.entity");
const typeorm_2 = require("typeorm");
let JobService = class JobService {
    dataSource;
    attemptRepo;
    otpRepo;
    loginAttemptRepo;
    storyRepo;
    userRepo;
    reportRepo;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.attemptRepo = this.dataSource.getRepository(Attempt_entity_1.AttemptEntity);
        this.otpRepo = this.dataSource.getRepository(Otp_entity_1.OtpEntity);
        this.loginAttemptRepo = this.dataSource.getRepository(Attempt_entity_1.LoginAttemptEntity);
        this.storyRepo = this.dataSource.getRepository(Story_entity_1.StoryEntity);
        this.userRepo = this.dataSource.getRepository(User_entity_1.UserEntity);
        this.reportRepo = this.dataSource.getRepository(Report_entity_1.ReportEntity);
    }
    async deleteAttempts() {
        await this.attemptRepo.delete({
            attempt: (0, typeorm_2.MoreThan)(3),
            updatedAt: (0, typeorm_2.LessThan)((0, date_fns_1.addHours)(new Date(), -1)),
        });
    }
    async deleteOtpCodes() {
        await this.otpRepo.delete({
            expireTime: (0, typeorm_2.LessThan)(new Date())
        });
    }
    async clearLoginAttempts() {
        await this.loginAttemptRepo.delete({
            createdAt: (0, typeorm_2.LessThan)((0, date_fns_1.addHours)(new Date(), -1)),
        });
    }
    async changeStoryStatus() {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        await this.storyRepo.update({ createdAt: (0, typeorm_2.LessThan)(twentyFourHoursAgo) }, { isActive: false });
    }
    async userReport() {
        await this.userRepo.update({ reportCount: (0, typeorm_2.MoreThanOrEqual)(5) }, { isReport: true });
    }
    async deleteReport() {
        let users = await this.userRepo.find({
            where: {
                isReport: true,
                updatedAt: (0, typeorm_2.LessThan)((0, date_fns_1.subMinutes)(new Date(), 10))
            }
        });
        if (!users)
            return false;
        users.map(async (user) => {
            await this.userRepo.update({ id: user.id }, { isReport: false, reportCount: 0 });
            await this.reportRepo.delete({ to: user.id });
        });
    }
};
exports.JobService = JobService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobService.prototype, "deleteAttempts", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobService.prototype, "deleteOtpCodes", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobService.prototype, "clearLoginAttempts", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobService.prototype, "changeStoryStatus", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobService.prototype, "userReport", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobService.prototype, "deleteReport", null);
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], JobService);
//# sourceMappingURL=job.service.js.map