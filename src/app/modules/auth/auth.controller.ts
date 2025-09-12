/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextFunction, Request, Response} from 'express';
import {catchAsync} from '../../utils/catchAsync';
import {sendResponse} from '../../utils/sendResponse';
import {StatusCodes} from 'http-status-codes';
import {AuthServices} from './auth.services';
import AppError from '../../errorHelpers/AppError';
import {setAuthCookie} from '../../utils/setCookie';

const credentialsLogin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const loginInfo = await AuthServices.credentialsLogin(req.body);
        setAuthCookie(res, loginInfo);
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.ACCEPTED,
            message: 'User logged in successfully',
            data: loginInfo,
        });
    },
);
const getNewAccessToken = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                'No refresh token received from cookies',
            );
        }
        const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.ACCEPTED,
            message: 'New access token retrieved successfully',
            data: tokenInfo,
        });
        setAuthCookie(res, tokenInfo);
    },
);
const logout = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.ACCEPTED,
            message: 'User logged out successfully',
            data: null,
        });
    },
);

export const authControllers = {credentialsLogin, getNewAccessToken, logout};
