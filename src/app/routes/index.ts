import {Router} from 'express';
import {userRoutes} from '../modules/user/user.routes';
import {authRoutes} from '../modules/auth/auth.routes';
import {divisionRoutes} from '../modules/division/division.route';
import {TourRoutes} from '../modules/tour/tour.route';

export const router = Router();
const moduleRoutes = [
    {path: '/user', route: userRoutes},
    {path: '/auth', route: authRoutes},
    {path: '/division', route: divisionRoutes},
    {path: '/tour', route: TourRoutes},
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
