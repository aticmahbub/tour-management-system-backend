import {Router} from 'express';
import {userControllers} from './user.controller';
import {createUserZodSchema} from './user.validation';
import {validateRequest} from '../../middlewares/validateRequest';

const router = Router();

router.post(
    '/register',
    validateRequest(createUserZodSchema),
    userControllers.createUser,
);
router.get('/all-users', userControllers.getAllUsers);

export const userRoutes = router;
