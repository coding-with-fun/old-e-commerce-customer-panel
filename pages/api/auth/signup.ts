import connectMongo from '@/database/conn';
import _ from 'lodash';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
};

export default handler;
