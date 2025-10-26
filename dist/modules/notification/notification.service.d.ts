import { CreateNotificationDto } from "./dto/create-notification.dto";
import { DataSource } from "typeorm";
import { NotificationEntity } from "src/database/entity/Notification.entity";
import { ClsService } from "nestjs-cls";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { SocketGateway } from "../socket/socket.gateway";
export declare class NotificationService {
    private dataSource;
    private cls;
    private socketGateway;
    private notificationRepo;
    constructor(dataSource: DataSource, cls: ClsService, socketGateway: SocketGateway);
    list(params: PaginationDto): Promise<NotificationEntity[]>;
    item(id: number): Promise<NotificationEntity>;
    createNotification(params: CreateNotificationDto): Promise<{
        message: string;
    }>;
    updateNotifications(params: UpdateNotificationDto): Promise<{
        message: string;
    }>;
}
