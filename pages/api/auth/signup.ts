import connectMongo from '@/database/conn';
import response from '@/libs/response';
import requestValidator from '@/middlewares/requestValidator';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const parsedData = await requestValidator(req, res, schema);
        console.log(parsedData);

        await connectMongo();

        return response(res, {
            name: 'John Doe',
            message: 'Customer signed up successfully.',
        });
    } catch (error) {
        return response(res, null, error);
    } finally {
        await mongoose.disconnect();
    }
};

export default handler;

const schema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: 'Email address is required.',
                invalid_type_error: 'Email address is required.',
            })
            .email('Invalid email address.'),
    }),
});
