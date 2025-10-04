"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
const seedSuperAdmin_1 = require("./app/utils/seedSuperAdmin");
const redis_config_1 = require("./app/config/redis.config");
let server;
const bootstrap = async () => {
    try {
        await mongoose_1.default.connect(`${env_1.envVars.DB_URL}`);
        console.log('connected to mongoose');
        server = app_1.default.listen(env_1.envVars.PORT || 4000, () => {
            console.log(`App is listening to ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
(async () => {
    await (0, redis_config_1.connectRedis)();
    await bootstrap();
    await (0, seedSuperAdmin_1.seedSuperAdmin)();
})();
process.on('unhandledRejection', (err) => {
    console.log('Unhandled rejection detected... Server shutting down', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    console.log('Uncaught exception detected... Server shutting down', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received ... Server shutting down');
    if (server) {
        server.close(() => process.exit(1));
    }
});
process.on('SIGINT', () => {
    console.log('SIGINT signal received ... Server shutting down');
    if (server) {
        server.close(() => process.exit(1));
    }
});
