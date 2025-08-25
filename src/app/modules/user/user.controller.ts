import {Request, Response} from 'express';
import statusCodes from 'http-status-codes';
import {userServices} from './user.services';

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userServices.createUser(req.body);
        res.status(statusCodes.CREATED).json({
            message: 'User created successfully',
            user,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        res.status(statusCodes.BAD_REQUEST).json({
            message: `Something went wrong!!! ${error.message}`,
            error,
        });
    }
};

export const userControllers = {
    createUser,
};
