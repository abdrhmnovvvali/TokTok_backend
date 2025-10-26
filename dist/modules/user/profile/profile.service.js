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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Profile_entity_1 = require("../../../database/entity/Profile.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user.service");
const nestjs_cls_1 = require("nestjs-cls");
const profile_select_1 = require("../../../shared/selects/profile.select");
const follow_service_1 = require("../../follow/follow.service");
const ban_service_1 = require("../../ban/ban.service");
let ProfileService = class ProfileService {
    dataSource;
    userService;
    cls;
    followService;
    banService;
    profileRepo;
    constructor(dataSource, userService, cls, followService, banService) {
        this.dataSource = dataSource;
        this.userService = userService;
        this.cls = cls;
        this.followService = followService;
        this.banService = banService;
        this.profileRepo = this.dataSource.getRepository(Profile_entity_1.ProfileEntity);
    }
    async updateProfile(id, params) {
        const myUser = this.cls.get("user");
        if (myUser.id !== id) {
            throw new common_1.ForbiddenException("You do not have permission to update this username.");
        }
        const { affected } = await this.profileRepo.update({ userId: id }, params);
        if (!affected)
            throw new common_1.BadRequestException("Something went wrong");
        return {
            message: "User is updated successfully"
        };
    }
    async getMyProfile() {
        let user = this.cls.get("user");
        let profile = await this.profileRepo.findOne({
            where: {
                userId: user.id
            },
            relations: ['image', 'user'],
            select: profile_select_1.MyProfileSelect
        });
        if (!profile)
            throw new common_1.NotFoundException("Profile is not found");
        return profile;
    }
    async getProfile(id) {
        let user = this.cls.get('user');
        if (id === user.id) {
            throw new common_1.BadRequestException("End point is wrong");
        }
        let profileUser = await this.userService.findUser(id);
        if (!profileUser)
            throw new common_1.NotFoundException("User is not found");
        let isBan = await this.banService.checkBan(user.id, profileUser.id);
        if (isBan)
            throw new common_1.ForbiddenException("You cannot view this profile. Either you have banned this user or they have banned you.");
        let isFollowing = false;
        isFollowing = await this.followService.checkStatus(user.id, id);
        let profile = await this.profileRepo.findOne({
            where: {
                userId: profileUser.id
            },
            relations: ['image', 'user'],
            select: profile_select_1.ProfileSelect
        });
        return { profile, isFollowing };
    }
    async incrementField(id, field, value) {
        await this.profileRepo.increment({ userId: id }, field, value);
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => follow_service_1.FollowService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        user_service_1.UserService,
        nestjs_cls_1.ClsService,
        follow_service_1.FollowService,
        ban_service_1.BanService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map