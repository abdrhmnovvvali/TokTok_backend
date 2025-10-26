import { JwtService } from "@nestjs/jwt";
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UserService } from "../user/user.service";
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwt;
    private userService;
    server: Server;
    constructor(jwt: JwtService, userService: UserService);
    handleDisconnect(client: any): void;
    handleConnection(client: any, ...args: any[]): void;
    userAuthorization(socket: Socket, body: any): Promise<void>;
}
