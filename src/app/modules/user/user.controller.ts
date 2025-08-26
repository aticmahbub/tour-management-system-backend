import {NextFunction, Request, Response} from 'express';
import statusCodes from 'http-status-codes';
import {userServices} from './user.services';
import {catchAsync} from '../../utils/catchAsync';

const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await userServices.createUser(req.body);
        res.status(statusCodes.CREATED).json({
            message: 'User created successfully',
            user,
        });
    },
);
const getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const users = await userServices.getAllUsers();
        res.status(statusCodes.OK).json({
            success: true,
            message: 'All users retrieved successfully',
            data: users,
        });
    },
);

export const userControllers = {
    createUser,
    getAllUsers,
};
