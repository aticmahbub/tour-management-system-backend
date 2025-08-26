import {NextFunction, Request, Response} from 'express';
import statusCodes from 'http-status-codes';
import {userServices} from './user.services';
import AppError from '../../errorHelpers/appError';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new AppError(statusCodes.BAD_REQUEST, 'Fake error');
        const user = await userServices.createUser(req.body);
        res.status(statusCodes.CREATED).json({
            message: 'User created successfully',
            user,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        next(error);
    }
};

export const userControllers = {
    createUser,
};
