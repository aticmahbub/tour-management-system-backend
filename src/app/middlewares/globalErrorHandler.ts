/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextFunction, Request, Response} from 'express';
import {envVars} from '../config/env';
import AppError from '../errorHelpers/AppError';

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log(err);
    const errorSources: any = [
        // {path: 'isDeleted',
        // message: 'Cast failed'}
    ];
    let statusCode = 500;
    let message = `Something went wrong,${err.message}`;

    // Mongoose duplicate error
    if (err.code === 11000) {
        const matchedArray = err.message.match(/"([^"]*)"/);
        statusCode = 400;
        message = `${matchedArray[1]} already exists`;
    }
    // Mongoose cast error
    else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid mongodb ObjectId';
    }
    // Mongoose validation error
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = Object.values(err.errors);

        errors.forEach((errorObject: any) =>
            errorSources.push({
                path: errorObject.path,
                message: errorObject.message,
            }),
        );
        message = err.message;
    }
    // Zod error
    else if (err.name === 'ZodError') {
        statusCode = 400;
        message = 'Zod Error';
        err.issues.forEach((issue: any) => {
            errorSources.push({
                path: issue.path[issue.path.length - 1],
                message: issue.message,
            });
        });
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: envVars.NODE_ENV === 'development' ? err.stack : null,
    });
};
