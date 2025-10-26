"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const nestjs_cls_1 = require("nestjs-cls");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./modules/auth/auth.module");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const mailer_1 = require("@nestjs-modules/mailer");
const schedule_1 = require("@nestjs/schedule");
const job_module_1 = require("./jobs/job.module");
const user_module_1 = require("./modules/user/user.module");
const profile_module_1 = require("./modules/user/profile/profile.module");
const upload_module_1 = require("./modules/upload/upload.module");
const follow_module_1 = require("./modules/follow/follow.module");
const media_module_1 = require("./modules/media/media.module");
const post_module_1 = require("./modules/post/post.module");
const story_module_1 = require("./modules/story/story.module");
const highlight_module_1 = require("./modules/highlight/highlight.module");
const report_module_1 = require("./modules/report/report.module");
const chat_module_1 = require("./modules/chat/chat.module");
const socket_module_1 = require("./modules/socket/socket.module");
const notification_module_1 = require("./modules/notification/notification.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        type: 'postgres',
                        url: config.get('DATABASE_URL'),
                        entities: [(0, path_1.join)(__dirname, 'database/entity/*.entity.{ts,js}')],
                        migrations: [(0, path_1.join)(__dirname, 'database/migrations/*.{ts,js}')],
                        logging: true,
                        synchronize: true,
                    };
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: {
                    mount: true,
                    setup: (cls, req) => {
                        cls.set('ip', req.ip);
                    },
                },
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory(config) {
                    return {
                        secret: config.get('JWT_SECRET'),
                        signOptions: { expiresIn: '1d' },
                    };
                },
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory(config) {
                    return {
                        transport: {
                            host: config.get('SMTP_HOST'),
                            port: config.get('SMTP_PORT'),
                            secure: config.get('SMTP_SECURE'),
                            auth: {
                                user: config.get('SMTP_USER'),
                                pass: config.get('SMTP_PASS'),
                            },
                        },
                        defaults: {
                            from: `"chat" <${config.get('SMTP_FROM')}>`,
                        },
                        template: {
                            dir: __dirname + '/templates',
                            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                            options: {
                                strict: true,
                            },
                        },
                    };
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            job_module_1.JobModule,
            user_module_1.UserModule,
            profile_module_1.ProfileModule,
            upload_module_1.UploadModule,
            follow_module_1.FollowModule,
            media_module_1.MediaModule,
            post_module_1.PostModule,
            story_module_1.StoryModule,
            highlight_module_1.HighlightModule,
            report_module_1.ReportModule,
            chat_module_1.ChatModule,
            socket_module_1.SocketModule,
            notification_module_1.NotificationModule
        ],
        controllers: [],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map