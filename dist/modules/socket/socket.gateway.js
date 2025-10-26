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
exports.SocketGateway = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_service_1 = require("../user/user.service");
let SocketGateway = class SocketGateway {
    jwt;
    userService;
    server;
    constructor(jwt, userService) {
        this.jwt = jwt;
        this.userService = userService;
    }
    handleDisconnect(client) {
        console.log("Disconnected");
    }
    handleConnection(client, ...args) {
        console.log("Connected");
    }
    async userAuthorization(socket, body) {
        let { token } = body;
        try {
            let payload = this.jwt.verify(token);
            if (!payload.userId)
                throw new Error();
            let user = await this.userService.findUser(payload.userId);
            if (!user)
                throw new Error();
            socket.join(`user_${user.id}`);
            socket.data.user = user;
            socket.emit("authorization", { status: "success" });
        }
        catch (error) {
            socket.emit("authorization", { status: "fail" });
        }
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("authorize"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "userAuthorization", null);
exports.SocketGateway = SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } }),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], SocketGateway);
//# sourceMappingURL=socket.gateway.js.map