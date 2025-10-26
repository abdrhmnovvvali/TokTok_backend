import { DataSource } from "typeorm";
export declare class JobService {
    private dataSource;
    private attemptRepo;
    private otpRepo;
    private loginAttemptRepo;
    private storyRepo;
    private userRepo;
    private reportRepo;
    constructor(dataSource: DataSource);
    deleteAttempts(): Promise<void>;
    deleteOtpCodes(): Promise<void>;
    clearLoginAttempts(): Promise<void>;
    changeStoryStatus(): Promise<void>;
    userReport(): Promise<void>;
    deleteReport(): Promise<false | undefined>;
}
