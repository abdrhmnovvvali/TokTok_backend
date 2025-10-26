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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("../../database/entity/User.entity");
const typeorm_2 = require("typeorm");
const User_enum_1 = require("../../shared/enums/User.enum");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
const Otp_entity_1 = require("../../database/entity/Otp.entity");
const otp_generator_1 = require("otp-generator");
const date_fns_1 = require("date-fns");
const Attempt_entity_1 = require("../../database/entity/Attempt.entity");
const uuid_1 = require("uuid");
const nestjs_cls_1 = require("nestjs-cls");
const firebase_service_1 = require("../../libs/firebase/firebase.service");
const Image_entity_1 = require("../../database/entity/Image.entity");
let AuthService = class AuthService {
    dataSource;
    jwt;
    mailService;
    cls;
    firebaseService;
    userRepo;
    otpRepo;
    attemptRepo;
    imageRepo;
    loginAttemptRepo;
    constructor(dataSource, jwt, mailService, cls, firebaseService) {
        this.dataSource = dataSource;
        this.jwt = jwt;
        this.mailService = mailService;
        this.cls = cls;
        this.firebaseService = firebaseService;
        this.userRepo = this.dataSource.getRepository(User_entity_1.UserEntity);
        this.otpRepo = this.dataSource.getRepository(Otp_entity_1.OtpEntity);
        this.attemptRepo = this.dataSource.getRepository(Attempt_entity_1.AttemptEntity);
        this.imageRepo = this.dataSource.getRepository(Image_entity_1.ImageEntity);
        this.loginAttemptRepo = this.dataSource.getRepository(Attempt_entity_1.LoginAttemptEntity);
    }
    async register(params) {
        if (!params.email && !params.phone)
            throw new common_1.BadRequestException("Email or phone is required");
        let username = params.username.toLowerCase();
        let email = params.email?.toLowerCase();
        let phone = params.phone;
        let where = [
            { username }
        ];
        if (params.email) {
            where.push({
                email
            });
        }
        if (params.phone) {
            where.push({
                phone
            });
        }
        let existUser = await this.userRepo.findOne({ where });
        if (existUser) {
            if (existUser.username === username) {
                throw new common_1.ConflictException({
                    message: "Username is already exists",
                    suggetions: await this.suggetionsUsername(username)
                });
            }
            else if (existUser.email === email) {
                throw new common_1.ConflictException("Email is already exists");
            }
            else if (existUser.phone === phone) {
                throw new common_1.ConflictException("Phone is already exists");
            }
        }
        let user = this.userRepo.create({
            email,
            phone,
            username,
            password: params.password,
            profile: {
                fullName: params.fullName
            }
        });
        await user.save();
        let token = this.generateToken(user.id);
        if (email) {
            await this.mailService.sendMail({
                to: email,
                subject: 'Welcome to Tok Tok',
                template: 'welcome',
                context: {
                    username: user.username
                }
            });
        }
        return {
            message: "User is created successfully",
            token,
            id: user.id
        };
    }
    check(params) {
        try {
            this.jwt.verify(params.token);
            return { status: true };
        }
        catch {
            return { status: false };
        }
    }
    generateToken(id) {
        let token = this.jwt.sign({ userId: id });
        return token;
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
    async login(params) {
        let identifer = params.username.toLowerCase();
        let where = [
            {
                username: identifer
            },
            {
                email: identifer
            },
            {
                phone: identifer
            }
        ];
        let user = await this.userRepo.findOne({ where });
        if (!user)
            throw new common_1.UnauthorizedException("Username or password is wrong");
        await this.checkLoginAttempts(user);
        let checkPaasword = await (0, bcrypt_1.compare)(params.password, user.password);
        if (!checkPaasword) {
            await this.addLoginAttempts(user);
            throw new common_1.UnauthorizedException("Username or password is wrong");
        }
        await this.clearAllAttempts(user);
        if (user.isReport) {
            throw new common_1.BadRequestException("You are ban");
        }
        let token = this.generateToken(user.id);
        return {
            token,
            id: user.id
        };
    }
    async forgetPassword(params) {
        let user = await this.userRepo.findOne({ where: { email: params.email } });
        if (!user)
            throw new common_1.NotFoundException("Email is not found");
        let attemptCheck = await this.attemptRepo.findOne({
            where: {
                userId: user.id,
                type: User_enum_1.UserAttemptType.FORGET_PASSWORD
            }
        });
        if (!attemptCheck) {
            attemptCheck = this.attemptRepo.create({
                userId: user.id,
                type: User_enum_1.UserAttemptType.FORGET_PASSWORD,
                attempt: 0
            });
        }
        if (attemptCheck.attempt > 3) {
            throw new common_1.HttpException('Try again in 1 hour', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        let otp = await this.otpRepo.findOne({
            where: {
                userId: user.id,
                expireTime: (0, typeorm_2.MoreThan)(new Date()),
            }
        });
        if (!otp) {
            const code = (0, otp_generator_1.generate)(4, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            otp = this.otpRepo.create({
                userId: user.id,
                code,
                expireTime: (0, date_fns_1.addMinutes)(new Date(), 30),
                token: (0, uuid_1.v4)()
            });
            await otp.save();
        }
        try {
            await this.mailService.sendMail({
                to: user.email,
                subject: `Forget Password Request`,
                template: 'forget-password',
                context: {
                    username: user.username,
                    code: otp.code,
                    resetLink: params.resetLink
                },
            });
            attemptCheck.attempt += 1;
            await attemptCheck.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Email sent is failed");
        }
        return {
            message: "Email is sent successfully"
        };
    }
    async confirmOtpCode(params) {
        let otp = await this.otpRepo.findOne({
            where: {
                code: params.code,
                expireTime: (0, typeorm_2.MoreThan)(new Date())
            }
        });
        if (!otp)
            throw new common_1.NotFoundException("Otp code is wrong");
        return {
            token: otp.token
        };
    }
    async forgetPasswordConfirm(params) {
        if (params.newPassword !== params.repeatPassword) {
            throw new common_1.BadRequestException("Repeat password is not match with new password");
        }
        let otp = await this.otpRepo.findOne({
            where: {
                token: params.token,
                expireTime: (0, typeorm_2.MoreThan)(new Date())
            }
        });
        if (!otp)
            throw new common_1.BadRequestException("Token is invalid");
        const [user, attemptCheck] = await Promise.all([
            this.userRepo.findOne({
                where: { id: otp.userId }
            }),
            this.attemptRepo.findOne({
                where: {
                    userId: otp.userId,
                    type: User_enum_1.UserAttemptType.WRONG_OTP_CODE
                }
            })
        ]);
        if (!user)
            throw new common_1.NotFoundException("User is not found");
        const attempt = attemptCheck || this.attemptRepo.create({
            userId: user.id,
            type: User_enum_1.UserAttemptType.WRONG_OTP_CODE,
            attempt: 0
        });
        if (attempt.attempt > 3) {
            throw new common_1.HttpException('Too many requests', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        user.password = params.newPassword;
        await Promise.all([
            user.save(),
            this.attemptRepo.delete({ userId: user.id }),
            this.otpRepo.delete({ userId: user.id })
        ]);
        const token = this.generateToken(user.id);
        return {
            message: 'Password is updated successfully',
            token,
            id: user.id
        };
    }
    async resetPassword(params) {
        if (params.newPassword !== params.repeatPassword) {
            throw new common_1.BadRequestException("Repeat password is not match with new password");
        }
        let user = this.cls.get("user");
        let checkPassword = await (0, bcrypt_1.compare)(params.currentPassword, user.password);
        if (!checkPassword)
            throw new common_1.BadRequestException("Current password is wrong");
        user.password = params.newPassword;
        await user.save();
        return {
            message: "Password is updated successfully"
        };
    }
    async loginWithFirebase(params) {
        let admin = this.firebaseService.firebaseApp;
        let result = await admin.auth().verifyIdToken(params.token);
        if (!result?.uid)
            throw new common_1.InternalServerErrorException("Something went wrong");
        let email = result.email;
        let uuid = result.uid;
        let where = [
            {
                providerId: uuid,
                provider: User_enum_1.UserProvider.FIREBASE
            }
        ];
        if (email) {
            where.push({
                email
            });
        }
        let user = await this.userRepo.findOne({ where });
        if (!user) {
            let findUsername = result.name ? result.name : result.email?.split('.')[0];
            let usernames = await this.suggetionsUsername(findUsername);
            let image = result.picture
                ? await this.imageRepo.save({
                    url: result.picture,
                })
                : undefined;
            user = this.userRepo.create({
                password: (0, uuid_1.v4)(),
                username: usernames[0],
                provider: User_enum_1.UserProvider.FIREBASE,
                providerId: uuid,
                email,
                profile: {
                    fullName: result.name,
                    imageId: image?.id
                }
            });
            await user.save();
            await this.mailService.sendMail({
                to: email,
                subject: 'Welcome to Tok Tok',
                template: 'welcome',
                context: {
                    username: user.username
                }
            });
        }
        if (user.isReport) {
            throw new common_1.BadRequestException("You are ban");
        }
        let token = this.generateToken(user.id);
        return {
            token
        };
    }
    async checkLoginAttempts(user) {
        let ip = this.cls.get("ip");
        let attempts = await this.loginAttemptRepo.count({
            where: {
                ip,
                userId: user.id
            }
        });
        if (attempts > 5) {
            throw new common_1.HttpException('Please try again later', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
    }
    async addLoginAttempts(user) {
        let ip = this.cls.get("ip");
        let attempt = this.loginAttemptRepo.create({
            ip,
            userId: user.id,
            createdAt: new Date()
        });
        await attempt.save();
        return true;
    }
    async clearAllAttempts(user) {
        let ip = this.cls.get("ip");
        await this.loginAttemptRepo.delete({
            userId: user.id,
            ip
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        jwt_1.JwtService,
        mailer_1.MailerService,
        nestjs_cls_1.ClsService,
        firebase_service_1.FirebaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map