var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
dotenv.config();
AdminJS.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database,
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST || 'localhost',
                port: 5433,
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: 'postgres',
                entities: ['dist/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            ConfigModule.forRoot({
                envFilePath: '.env',
            }),
            AdminModule.createAdminAsync({
                useFactory: async () => {
                    return {
                        adminJsOptions: options,
                        auth: {
                            provider,
                            cookiePassword: process.env.COOKIE_SECRET,
                            cookieName: 'adminjs',
                        },
                        sessionOptions: {
                            resave: true,
                            saveUninitialized: true,
                            secret: process.env.COOKIE_SECRET,
                        },
                    };
                },
            }),
        ],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map