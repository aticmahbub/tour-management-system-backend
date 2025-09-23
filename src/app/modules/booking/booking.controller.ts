import {Request, Response} from 'express';
import {catchAsync} from '../../utils/catchAsync';
import {sendResponse} from '../../utils/sendResponse';
import {BookingService} from './booking.service';
import {StatusCodes} from 'http-status-codes';
import {JwtPayload} from 'jsonwebtoken';

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
    const booking = await BookingService.createBooking(
        req.body,
        decodedToken.userId,
    );

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Booking created successfully',
        data: booking,
    });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
    const booking = BookingService.getUserBookings();
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Bookings retrieved successfully',
        data: booking,
    });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
    const booking = BookingService.sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Booking retrieved successfully',
        data: booking,
    });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const booking = BookingService.sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Booking retrieved successfully',
        data: booking,
    });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
    const booking = BookingService.sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Booking retrieved successfully',
        data: booking,
    });
});

export const BookingController = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    getUserBookings,
    updateBookingStatus,
};
