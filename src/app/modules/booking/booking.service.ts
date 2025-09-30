/* eslint-disable @typescript-eslint/no-explicit-any */
import {StatusCodes} from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import {User} from '../user/user.model';
import {BOOKING_STATUS, IBooking} from './booking.interface';
import {Booking} from './booking.model';
import {Tour} from '../tour/tour.model';
import {Payment} from '../payment/payment.model';
import {ISSLCommerz} from '../sslCommerz/sslCommerz.interface';
import {SSLService} from '../sslCommerz/sslCommerz.service';
import {getTransactionId} from '../../utils/getTransactionId';

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const transactionId = getTransactionId();

    const session = await Booking.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(userId);

        if (!user?.phone || !user.address) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                'Please update your profile to book a tour',
            );
        }

        const tour = await Tour.findById(payload.tour).select('costFrom');
        if (!tour) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'No tour cost found');
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const amount = Number(tour.costFrom) * Number(payload.guestCount!);

        const booking = await Booking.create(
            [
                {
                    user: userId,
                    status: BOOKING_STATUS.PENDING,
                    ...payload,
                },
            ],
            {session},
        );
        const payment = await Payment.create(
            [
                {
                    booking: booking[0]._id,
                    status: BOOKING_STATUS.UNPAID,
                    transactionId,
                    amount,
                },
            ],
            {session},
        );
        const updatedBooking = await Booking.findByIdAndUpdate(
            booking[0]._id,
            {payment: payment[0]._id},
            {new: true, runValidators: true, session},
        )
            .populate('user', 'name email phone address')
            .populate('tour', 'title costFrom')
            .populate('payment');

        const userAddress = (updatedBooking?.user as any).address;
        const userEmail = (updatedBooking?.user as any).email;
        const userPhoneNumber = (updatedBooking?.user as any).phone;
        const userName = (updatedBooking?.user as any).name;
        const sslPayload: ISSLCommerz = {
            address: userAddress,
            email: userEmail,
            phoneNumber: userPhoneNumber,
            name: userName,
            amount,
            transactionId,
        };
        const sslPayment = await SSLService.sslPaymentInit(sslPayload);

        await session.commitTransaction();
        session.endSession();
        return {
            paymentUrl: sslPayment.GatewayPageURL,
            booking: updatedBooking,
        };
    } catch (error) {
        session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const BookingService = {
    createBooking,
    // getUserBookings,
    // getBookingById,
    // updateBookingStatus,
    // getAllBookings,
};
