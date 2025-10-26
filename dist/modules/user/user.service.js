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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("../../database/entity/User.entity");
const typeorm_2 = require("typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const mailer_1 = require("@nestjs-modules/mailer");
const follow_service_1 = require("../follow/follow.service");
let UserService = class UserService {
    dataSource;
    cls;
    mailService;
    followService;
    userRepo;
    constructor(dataSource, cls, mailService, followService) {
        this.dataSource = dataSource;
        this.cls = cls;
        this.mailService = mailService;
        this.followService = followService;
        this.userRepo = this.dataSource.getRepository(User_entity_1.UserEntity);
    }
    async findUser(id) {
        let user = await this.userRepo.findOne({
            where: { id }
        });
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        return user;
    }
    findUsers(ids) {
        return this.userRepo.findBy({
            id: (0, typeorm_2.In)(ids)
        });
    }
    async getPrivateUsers(ids) {
        const privateUsers = await this.userRepo.find({
            where: { id: (0, typeorm_2.In)(ids), isPrivate: true },
            select: ["id"]
        });
        return privateUsers;
    }
    async searchUser(params) {
        let page = (params.page || 1) - 1;
        let limit = params.limit;
        let users = await this.userRepo.find({
            where: {
                username: (0, typeorm_2.Like)(`${params.name}%`)
            },
            skip: page * limit,
            take: limit
        });
        return users;
    }
    async suggetionsUsername(username) {
        username = username
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/^-+|-+$/g, '');
        let suggestions = Array.from({ length: 10 }).map((_) => `${username}${Math.floor(Math.random() * 1000)}`);
        let checkUsernames = await this.userRepo.find({
            where: {
                username: (0, typeorm_2.In)(suggestions)
            },
            select: {
                id: true,
                username: true
            }
        });
        let existUsername = checkUsernames.map((user) => user.username);
        suggestions = suggestions.filter(item => !existUsername.includes(item));
        return suggestions.slice(0, 2);
    }
    async checkUsername(username) {
        let check = await this.userRepo.exists({ where: { username } });
        return check;
    }
    async updateUsername(id, params) {
        let myUser = this.cls.get("user");
        let username = params.username.toLowerCase();
        if (myUser.id !== id) {
            throw new common_1.ForbiddenException("You do not have permission to update this username.");
        }
        let checkUsername = await this.checkUsername(username);
        if (checkUsername) {
            throw new common_1.ConflictException({
                message: "Username is already exists",
                suggetions: await this.suggetionsUsername(username)
            });
        }
        myUser.username = username;
        await myUser.save();
        return {
            message: "Username is updated successfully"
        };
    }
    async updateStatus(id, params) {
        let myUser = this.cls.get("user");
        if (myUser.id !== id) {
            throw new common_1.ForbiddenException("You do not have permission to update this status.");
        }
        myUser.isPrivate = params.isPrivate;
        await myUser.save();
        await this.followService.acceptAllPendingRequests();
        return {
            message: "User status is updated successfully"
        };
    }
    async updateEmail(id, params) {
        let myUser = this.cls.get("user");
        if (myUser.id !== id) {
            throw new common_1.ForbiddenException("You do not have permission to update this email.");
        }
        let checkEmail = await this.userRepo.exists({ where: { email: params.email } });
        if (checkEmail) {
            throw new common_1.ConflictException("Email is already exists");
        }
        myUser.email = params.email;
        await myUser.save();
        await this.mailService.sendMail({
            to: params.email,
            subject: 'Update email',
            template: 'update-email',
            context: {
                username: myUser.username,
                newEmail: params.email
            }
        });
        return {
            message: "Email is updated successfully"
        };
    }
    updateProfessionalAccount() {
        let user = this.cls.get("user");
    }
    async incrementReportCount(id) {
        let user = await this.findUser(id);
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        await this.userRepo.increment({ id: user.id }, 'reportCount', 1);
        return true;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => follow_service_1.FollowService))),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        nestjs_cls_1.ClsService,
        mailer_1.MailerService,
        follow_service_1.FollowService])
], UserService);
//# sourceMappingURL=user.service.js.map