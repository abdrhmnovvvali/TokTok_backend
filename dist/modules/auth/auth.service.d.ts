import { UserEntity } from "src/database/entity/User.entity";
import { DataSource } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { LoginDto, LoginWithFirebaseDto } from "./dto/login.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfirmOtpDto, ForgetPasswordConfirmDto, ForgetPasswordDto } from "./dto/forget-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ClsService } from "nestjs-cls";
import { FirebaseService } from "src/libs/firebase/firebase.service";
import { CheckDto } from "./dto/check.dto";
export declare class AuthService {
    private dataSource;
    private jwt;
    private mailService;
    private cls;
    private firebaseService;
    private userRepo;
    private otpRepo;
    private attemptRepo;
    private imageRepo;
    private loginAttemptRepo;
    constructor(dataSource: DataSource, jwt: JwtService, mailService: MailerService, cls: ClsService, firebaseService: FirebaseService);
    register(params: RegisterDto): Promise<{
        message: string;
        token: string;
        id: number;
    }>;
    check(params: CheckDto): {
        status: boolean;
    };
    generateToken(id: number): string;
    suggetionsUsername(username: string): Promise<string[]>;
    login(params: LoginDto): Promise<{
        token: string;
        id: number;
    }>;
    forgetPassword(params: ForgetPasswordDto): Promise<{
        message: string;
    }>;
    confirmOtpCode(params: ConfirmOtpDto): Promise<{
        token: string;
    }>;
    forgetPasswordConfirm(params: ForgetPasswordConfirmDto): Promise<{
        message: string;
        token: string;
        id: number;
    }>;
    resetPassword(params: ResetPasswordDto): Promise<{
        message: string;
    }>;
    loginWithFirebase(params: LoginWithFirebaseDto): Promise<{
        token: string;
    }>;
    checkLoginAttempts(user: UserEntity): Promise<void>;
    addLoginAttempts(user: UserEntity): Promise<boolean>;
    clearAllAttempts(user: UserEntity): Promise<void>;
}
