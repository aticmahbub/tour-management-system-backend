import {NextFunction, Request, Response} from 'express';
import {JwtPayload} from 'jsonwebtoken';
import {envVars} from '../config/env';
import AppError from '../errorHelpers/AppError';
import {IsActive} from '../modules/user/user.interface';
import {User} from '../modules/user/user.model';
import {verifyToken} from '../utils/jwt';

export const checkAuth =
    (...authRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken) {
                throw new AppError(401, 'No Token received');
            }

            const verifiedToken = verifyToken(
                accessToken,
                envVars.JWT_ACCESS_SECRET,
            ) as JwtPayload;

            const isUserExist = await User.findOne({
                email: verifiedToken.email,
            });

            if (!isUserExist) {
                throw new AppError(404, 'User does not exist');
            }
            if (!isUserExist.isVerified) {
                throw new AppError(403, 'User is not verified');
            }
            if (
                isUserExist.isActive === IsActive.BLOCKED ||
                isUserExist.isActive === IsActive.INACTIVE
            ) {
                throw new AppError(403, `User is ${isUserExist.isActive}`);
            }
            if (isUserExist.isDeleted) {
                throw new AppError(410, 'User is deleted');
            }

            if (!authRoles.includes(verifiedToken.role)) {
                throw new AppError(
                    403,
                    'You are not permitted to view this route!!!',
                );
            }
            req.user = verifiedToken;
            next();
        } catch (error) {
            console.log('jwt error', error);
            next(error);
        }
    };
