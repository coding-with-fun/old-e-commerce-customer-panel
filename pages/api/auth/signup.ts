import connectMongo from '@/database/conn';
import response from '@/libs/response';
import requestValidator from '@/middlewares/requestValidator';
import Customer from '@/schemas/customer.schema';
import { encryptPassword } from '@/utils/managePassword';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const parsedData = (await requestValidator(req, schema)) as schemaType;
        const {
            body: { email, name, password },
        } = parsedData;

        await connectMongo();

        const existingCustomer = await Customer.findOne({
            email,
        });
        if (existingCustomer) {
            throw new Error('Customer already exists.');
        }

        const customer = new Customer({
            email,
            name,
            password: await encryptPassword(password),
        });
        customer.customerID = customer._id;
        await customer.save();

        return response(res, {
            customer,
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
            .nonempty('Email address is required.')
            .email('Invalid email address.'),
        name: z.string({
            required_error: 'Name is required.',
            invalid_type_error: 'Name is required.',
        }),
        password: z
            .string({
                required_error: 'Password is required.',
                invalid_type_error: 'Password is required.',
            })
            .nonempty('Password is required.'),
    }),
});

type schemaType = z.infer<typeof schema>;
