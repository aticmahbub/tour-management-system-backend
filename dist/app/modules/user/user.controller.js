"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_services_1 = require("./user.services");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const createUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = await user_services_1.UserServices.createUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'User created successfully',
        data: user,
    });
});
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await user_services_1.UserServices.updateUser(userId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: 'User updated successfully',
        data: user,
    });
});
const getAllUsers = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const result = await user_services_1.UserServices.getAllUsers();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'All users retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});
const getSingleUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const id = req.params.id;
    const result = await user_services_1.UserServices.getSingleUser(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'User retrieved successfully',
        data: result.data,
    });
});
const getMe = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const result = await user_services_1.UserServices.getMe(decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'User retrieved successfully',
        data: result.data,
    });
});
exports.userControllers = {
    createUser,
    getAllUsers,
    updateUser,
    getMe,
};
