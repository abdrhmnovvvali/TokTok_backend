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
exports.BanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Ban_entity_1 = require("../../database/entity/Ban.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const nestjs_cls_1 = require("nestjs-cls");
const follow_service_1 = require("../follow/follow.service");
const ban_select_1 = require("../../shared/selects/ban.select");
let BanService = class BanService {
    dataSource;
    userService;
    cls;
    followService;
    banRepo;
    constructor(dataSource, userService, cls, followService) {
        this.dataSource = dataSource;
        this.userService = userService;
        this.cls = cls;
        this.followService = followService;
        this.banRepo = this.dataSource.getRepository(Ban_entity_1.BanEntity);
    }
    async banRequest(id) {
        let myUser = this.cls.get("user");
        if (myUser.id === id) {
            throw new common_1.BadRequestException("You cannot ban yourself");
        }
        let toUser = await this.userService.findUser(id);
        if (!toUser)
            throw new common_1.NotFoundException("User is not found");
        let checkBan = await this.banRepo.findOne({
            where: {
                fromId: myUser.id,
                toId: toUser.id
            }
        });
        if (checkBan)
            throw new common_1.BadRequestException("You have already banned this user");
        let ban = this.banRepo.create({
            toId: toUser.id,
            fromId: myUser.id
        });
        await ban.save();
        let checkMyFollower = await this.followService.checkFollow(toUser.id, myUser.id);
        if (checkMyFollower) {
            await this.followService.removeFollower({ from: toUser.id });
        }
        let checkMyFollowing = await this.followService.checkFollow(myUser.id, toUser.id);
        if (checkMyFollowing) {
            await this.followService.removeFollowing({ to: toUser.id });
        }
        return {
            message: "User has been successfully banned"
        };
    }
    async unBanRequest(id) {
        let myUser = this.cls.get("user");
        if (myUser.id === id) {
            throw new common_1.BadRequestException("You cannot unban yourself");
        }
        let toUser = await this.userService.findUser(id);
        if (!toUser)
            throw new common_1.NotFoundException("User is not found");
        let checkBan = await this.banRepo.findOne({
            where: {
                fromId: myUser.id,
                toId: toUser.id
            }
        });
        if (!checkBan)
            throw new common_1.NotFoundException("Ban request is not found");
        await this.banRepo.delete({ id: checkBan.id });
        return {
            message: "User has been successfully unbanned"
        };
    }
    async banList(id) {
        let myUser = this.cls.get("user");
        if (myUser.id !== id) {
            throw new common_1.ForbiddenException("Forbidden");
        }
        let bans = await this.banRepo.find({
            where: {
                fromId: myUser.id
            },
            relations: [
                'to',
                'to.profile',
                'to.profile.image'
            ],
            order: { createdAt: "DESC" },
            select: ban_select_1.BanUserSelect
        });
        return bans;
    }
    async checkBan(userOne, userTwo) {
        const exists = await this.banRepo.exists({
            where: [
                { fromId: userOne, toId: userTwo },
                { fromId: userTwo, toId: userOne }
            ]
        });
        return exists;
    }
    async getBannedUsers(userIds) {
        let myUser = this.cls.get("user");
        const bannedUsers = await this.banRepo.find({
            where: [
                { fromId: myUser.id, toId: (0, typeorm_2.In)(userIds) },
                { toId: myUser.id, fromId: (0, typeorm_2.In)(userIds) }
            ],
            select: ["fromId", "toId"]
        });
        return bannedUsers.map(ban => ban.fromId === myUser.id ? ban.toId : ban.fromId);
    }
};
exports.BanService = BanService;
exports.BanService = BanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => follow_service_1.FollowService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        user_service_1.UserService,
        nestjs_cls_1.ClsService,
        follow_service_1.FollowService])
], BanService);
//# sourceMappingURL=ban.service.js.map