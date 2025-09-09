/* eslint-disable no-console */
import {Server} from 'http';
import mongoose from 'mongoose';
import app from './app';
import {envVars} from './app/config/env';
import {seedSuperAdmin} from './app/utils/seedSuperAdmin';

let server: Server;

const bootstrap = async () => {
    try {
        await mongoose.connect(`${envVars.DB_URL}`);
        console.log('connected to mongoose');

        server = app.listen(envVars.PORT || 4000, () => {
            console.log(`App is listening to ${envVars.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};
(async () => {
    await bootstrap();
    await seedSuperAdmin();
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
