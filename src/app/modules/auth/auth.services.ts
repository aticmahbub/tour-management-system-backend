import {StatusCodes} from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import {User} from '../user/user.model';
import bcryptjs from 'bcryptjs';
import {
    createAccessTokenWithRefreshToken,
    createUserTokens,
} from '../../utils/userTokens';
import {IUser} from '../user/user.interface';

const credentialsLogin = async (payload: Partial<IUser>) => {
    const {email, password} = payload;
    const isUserExist = await User.findOne({email});

    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Email does not exist');
    }
    const isPasswordMatched = await bcryptjs.compare(
        password as string,
        isUserExist.password as string,
    );
    if (!isPasswordMatched) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Incorrect password');
    }
    const userTokens = createUserTokens(isUserExist);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password: pass, ...rest} = isUserExist.toObject();
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest,
    };
};
const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken =
        await createAccessTokenWithRefreshToken(refreshToken);
    return {
        accessToken: newAccessToken,
    };
};

export const AuthServices = {credentialsLogin, getNewAccessToken};
