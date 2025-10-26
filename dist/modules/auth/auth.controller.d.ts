import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto, LoginWithFirebaseDto } from "./dto/login.dto";
import { ConfirmOtpDto, ForgetPasswordConfirmDto, ForgetPasswordDto } from "./dto/forget-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { CheckDto } from "./dto/check.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<{
        message: string;
        token: string;
        id: number;
    }>;
    login(body: LoginDto): Promise<{
        token: string;
        id: number;
    }>;
    otpConfim(body: ConfirmOtpDto): Promise<{
        token: string;
    }>;
    check(body: CheckDto): {
        status: boolean;
    };
    forgetPassword(body: ForgetPasswordDto): Promise<{
        message: string;
    }>;
    forgetPasswordConfirm(body: ForgetPasswordConfirmDto): Promise<{
        message: string;
        token: string;
        id: number;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        message: string;
    }>;
    loginWithFirebase(body: LoginWithFirebaseDto): Promise<{
        token: string;
    }>;
}
