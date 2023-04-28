import env from '@/libs/env';
import _ from 'lodash';
import mongoose from 'mongoose';
import type { NextApiResponse } from 'next';

const connectMongo = async () => {
    try {
        const { connection } = await mongoose.connect(env.db.uri, {
            dbName: 'next-auth',
        });
        mongoose.set('debug', true);

        if (connection.readyState == 1) {
            console.log('MongoDB connected...');

            return Promise.resolve(true);
        }
    } catch (error) {
        const message = _.get(error, 'message', 'MongoDB not connected...');
        throw new Error(message);
    }
};

export default connectMongo;
