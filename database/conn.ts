import env from '@/libs/env';
import mongoose from 'mongoose';

const connectMongo = async () => {
    console.log({ uri: env.db.uri });

    const { connection } = await mongoose.connect(env.db.uri, {
        dbName: 'next-auth',
    });
    mongoose.set('debug', true);

    if (connection.readyState == 1) {
        console.log('MongoDB connected...');

        return Promise.resolve(true);
    }
};

export default connectMongo;
