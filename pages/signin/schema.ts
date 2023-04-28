import { z } from 'zod';

export const SignInFormSchema = z.object({
    email: z
        .string({
            required_error: 'Email address is required.',
            invalid_type_error: 'Email address is required.',
        })
        .nonempty('Email address is required.')
        .email('Invalid email address.'),
    password: z
        .string({
            required_error: 'Password is required.',
            invalid_type_error: 'Password is required.',
        })
        .nonempty('Password is required.'),
});
