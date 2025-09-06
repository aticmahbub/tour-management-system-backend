/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextFunction, Request, Response} from 'express';
import statusCodes from 'http-status-codes';
import {UserServices} from './user.services';
import {catchAsync} from '../../utils/catchAsync';
import {sendResponse} from '../../utils/sendResponse';

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

export const userControllers = {
    createUser,
    getAllUsers,
};
