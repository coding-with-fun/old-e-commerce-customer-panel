// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/database/conn';
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
        await connectMongo().catch((error) => {
            let message = 'MongoDB not connected...';
            if (error instanceof Error) {
                message = error.message;
            }
            console.log(message);

            throw new Error(message);
        });

        return res.status(200).json({ name: 'John Doe' });
    } catch (error) {
        let message = 'Something went wrong...';

        if (error instanceof Error) {
            console.log(error.message);
            message = error.message;
        }

        return res.json({
            name: message,
        });
    } finally {
        await mongoose.disconnect();
    }
}
