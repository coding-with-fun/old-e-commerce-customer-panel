// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/database/conn';
import _ from 'lodash';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
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
}
