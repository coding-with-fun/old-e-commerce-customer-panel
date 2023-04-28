import connectMongo from '@/database/conn';
import response from '@/libs/response';
import Customer from '@/schemas/customer.schema';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session || !session.user) {
            throw new Error(
                'You must be signed in to view the protected content on this page.'
            );
        }

        await connectMongo();

        const customer = await Customer.findOne({
            email: session.user.email,
        });

        return response(res, {
            message: 'Customer profile fetched successfully.',
            customer: {
                email: customer.email,
                name: customer.name,
                _id: customer._id,
                customerID: customer.customerID,
            },
        });
    } catch (error) {
        return response(res, null, error);
    } finally {
        await mongoose.disconnect();
    }
};

export default handler;
