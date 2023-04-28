import connectMongo from '@/database/conn';
import _ from 'lodash';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = schema.safeParse(req);

        if (!data.success) {
            const message = _.get(
                data,
                'error.issues[0].message',
                'Something went wrong.'
            );
            throw new Error(message);
        }

        await connectMongo();

        return res.status(200).json({ name: 'John Doe' });
    } catch (error) {
        const message = _.get(error, 'message', 'Something went wrong...');

        return res.json({
            name: message,
        });
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
