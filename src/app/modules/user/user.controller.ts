/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextFunction, Request, Response} from 'express';
import statusCodes from 'http-status-codes';
import {UserServices} from './user.services';
import {catchAsync} from '../../utils/catchAsync';
import {sendResponse} from '../../utils/sendResponse';
import {verifyToken} from '../../utils/jwt';
import {envVars} from '../../config/env';
import {JwtPayload} from 'jsonwebtoken';

const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await UserServices.createUser(req.body);
        sendResponse(res, {
            success: true,
            statusCode: statusCodes.CREATED,
            message: 'User created successfully',
            data: user,
        });
    },
);

const updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;
        const token = req.headers.authorization;
        const verifiedToken = req.user;
        const payload = req.body;
        const user = await UserServices.updateUser(
            userId,
            payload,
            verifiedToken as JwtPayload,
        );
        sendResponse(res, {
            success: true,
            statusCode: statusCodes.CREATED,
            message: 'User updated successfully',
            data: user,
        });
    },
);
const getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await UserServices.getAllUsers();
        sendResponse(res, {
            success: true,
            statusCode: statusCodes.OK,
            message: 'All users retrieved successfully',
            data: result.data,
            meta: result.meta,
        });
    },
);

const getSingleUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await UserServices.getSingleUser(id);

        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: 'User retrieved successfully',
            data: result.data,
        });
    },
);

const getMe = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const decodedToken = req.user as JwtPayload;
        const result = await UserServices.getMe(decodedToken.userId);

        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: 'User retrieved successfully',
            data: result.data,
        });
    },
);

export const userControllers = {
    createUser,
    getAllUsers,
    updateUser,
    getMe,
};
