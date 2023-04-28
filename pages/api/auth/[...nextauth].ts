import connectMongo from '@/database/conn';
import env from '@/libs/env';
import Customer from '@/schemas/customer.schema';
import _ from 'lodash';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: env.github.clientId,
            clientSecret: env.github.clientSecret,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                await connectMongo();
                const email = _.get(credentials, 'email', '');
                const password = _.get(credentials, 'password', '');

                const customer = await Customer.findOne({
                    email,
                });
                if (!customer) {
                    throw new Error('Customer does not exist.');
                }

                return {
                    email,
                    password,
                    id: customer._id,
                };
            },
        }),
    ],
    secret: 'XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=',
    session: {
        strategy: 'jwt',
    },
};

export default NextAuth(authOptions);
