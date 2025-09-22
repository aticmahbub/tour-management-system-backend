'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : {default: mod};
    };
Object.defineProperty(exports, '__esModule', {value: true});
const express_1 = __importDefault(require('express'));
const user_routes_1 = require('./app/modules/user/user.routes');
const cors_1 = __importDefault(require('cors'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors_1.default);
app.use('/api/v1/user', user_routes_1.UserRoutes);
app.get('/', (req, res) => {
    res.status(200).json({message: 'Tour management server is up and running'});
});
exports.default = app;
