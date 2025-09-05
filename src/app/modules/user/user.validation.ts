import z from 'zod';
import {IsActive, Role} from './user.interface';

export const createUserZodSchema = z.object({
    name: z
        .string({error: 'Name must be string'})
        .min(2, {
            message: 'Name too short. At least 2 characters needed',
        })
        .max(50, {message: 'Name can not exceed 50 characters'}),
    email: z
        .string({error: 'Email must be string'})
        .email({error: 'Invalid email format'}),
    password: z
        .string({error: 'Password must be string'})
        .min(8)
        .regex(/^(?=.*[A-Z])/, {
            message: 'Password must contain at least 1 uppercase letter.',
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: 'Password must contain at least one special character',
        })
        .regex(/^(?=.*\d)/, {
            message: 'Password must contain at least one number',
        }),
    phone: z
        .string({error: 'Phone number must be string'})
        .regex(/^(?:\+8801\d{9})$/)
        .optional(),
    address: z
        .string({message: 'Address must string'})
        .max(200, {message: 'Address can not exceed 200 characters'})
        .optional(),
});
export const updateUserZodSchema = z.object({
    name: z
        .string({error: 'Name must be string'})
        .min(2, {
            message: 'Name too short. At least 2 characters needed',
        })
        .max(50, {message: 'Name can not exceed 50 characters'})
        .optional(),
    password: z
        .string({error: 'Password must be string'})
        .min(8)
        .regex(/^(?=.*[A-Z])/, {
            message: 'Password must contain at least 1 uppercase letter.',
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: 'Password must contain at least one special character',
        })
        .regex(/^(?=.*\d)/, {
            message: 'Password must contain at least one number',
        })
        .optional(),
    phone: z
        .string({error: 'Phone number must be string'})
        .regex(/^(?:\+8801\d{9})$/)
        .optional(),
    address: z
        .string({message: 'Address must string'})
        .max(200, {message: 'Address can not exceed 200 characters'})
        .optional(),
    role: z.enum(Object.values(Role)).optional(),
    isActive: z.enum(Object.values(IsActive)).optional().optional(),
    isDeleted: z.boolean({error: 'isDeleted must be true or false'}).optional(),
    isVerified: z
        .boolean({error: 'isVerified must be true or false'})
        .optional(),
});
