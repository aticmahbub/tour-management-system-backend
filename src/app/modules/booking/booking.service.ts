import {StatusCodes} from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import {User} from '../user/user.model';
import {BOOKING_STATUS, IBooking} from './booking.interface';
import {Booking} from './booking.model';
import {Tour} from '../tour/tour.model';
import {Payment} from '../payment/payment.model';

const getTransactionId = () => {
    return `trx_${Date.now()}_${Math.ceil(Math.random() * 1000)}`;
};
const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const transactionId = getTransactionId();

    const session = await Booking.startSession();
    session.startTransaction();

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

    const booking = await Booking.create({
        user: userId,
        status: BOOKING_STATUS.PENDING,
        ...payload,
    });
    const payment = await Payment.create({
        booking: booking._id,
        status: BOOKING_STATUS.UNPAID,
        transactionId,
        amount,
    });
    const updatedBooking = await Booking.findByIdAndUpdate(
        booking._id,
        {
            payment: payment._id,
        },
        {new: true, runValidators: true},
    )
        .populate('user', 'name email phone address')
        .populate('tour', 'title costFrom')
        .populate('payment');
    return updatedBooking;
};

export const BookingService = {
    createBooking,
    // getUserBookings,
    // getBookingById,
    // updateBookingStatus,
    // getAllBookings,
};
