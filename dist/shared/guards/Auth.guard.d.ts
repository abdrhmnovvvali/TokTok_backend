import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
import { UserService } from "src/modules/user/user.service";
export declare class AuthGuard implements CanActivate {
    private jwt;
    private userService;
    private cls;
    constructor(jwt: JwtService, userService: UserService, cls: ClsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
