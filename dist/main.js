"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.use('/public', express.static((0, path_1.join)(__dirname, '..', 'public')));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Tok Tok')
        .setDescription('api documentation for chat application')
        .setVersion('1.0')
        .addTag('toktok')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('', app, documentFactory, {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customCssUrl: 'https://unpkg.com/swagger-ui-dist/swagger-ui.css',
        customJs: [
            'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
            'https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js',
        ],
        customfavIcon: 'https://unpkg.com/swagger-ui-dist/favicon-32x32.png'
    });
    await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
//# sourceMappingURL=main.js.map