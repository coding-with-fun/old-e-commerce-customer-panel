import connectMongo from '@/database/conn';
import env from '@/libs/env';
import Customer from '@/schemas/customer.schema';
import _ from 'lodash';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: env.github.clientId,
            clientSecret: env.github.clientSecret,
        }),
        // ...add more providers here
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
                // Add logic here to look up the user from the credentials supplied
                await connectMongo();
                console.log(credentials);

                const email = _.get(credentials, 'email', '');
                const password = _.get(credentials, 'password', '');

                const customer = await Customer.findOne({
                    email,
                });
                if (!customer) {
                    throw new Error('Customer does not exist.');
                }

                console.log(customer);

                return {
                    email,
                    password,
                    id: '1',
                };

                // const email = _.get(credentials, 'email', '');
                // const password = _.get(credentials, 'password', '');

                // const customer = await Customer.findOne({
                //     email,
                // });
                // if (!customer) {
                //     throw new Error('Customer does not exist.');
                // }

                // console.log(customer);

                // return {
                //     id: customer.customerID,
                //     email: customer.email,
                //     password: customer.password,
                // };

                // if (user) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return user;
                // } else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null;

                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }
            },
        }),
    ],
    secret: 'XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=',
    session: {
        strategy: 'jwt',
    },
};

export default NextAuth(authOptions);
