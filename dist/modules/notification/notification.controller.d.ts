import { NotificationService } from "./notification.service";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    list(query: PaginationDto): Promise<import("../../database/entity/Notification.entity").NotificationEntity[]>;
    item(id: number): Promise<import("../../database/entity/Notification.entity").NotificationEntity>;
    updateNotifications(body: UpdateNotificationDto): Promise<{
        message: string;
    }>;
}
