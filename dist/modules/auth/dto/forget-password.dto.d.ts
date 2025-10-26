export declare class ForgetPasswordDto {
    email: string;
    resetLink: string;
}
export declare class ConfirmOtpDto {
    code: string;
}
export declare class ForgetPasswordConfirmDto {
    newPassword: string;
    repeatPassword: string;
    token: string;
}
