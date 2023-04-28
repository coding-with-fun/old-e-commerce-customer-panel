import connectMongo from '@/database/conn';
import env from '@/libs/env';
import Customer, { CustomerDataType } from '@/schemas/customer.schema';
import { comparePassword } from '@/utils/managePassword';
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
            credentials: {},
            authorize: async (credentials) => {
                await connectMongo();
                const email = _.get(credentials, 'email', '');
                const password = _.get(credentials, 'password', '');

                const customer: CustomerDataType | null =
                    await Customer.findOne({
                        email,
                    });
                if (!customer) {
                    throw new Error('Customer does not exist.');
                }

                if (!(await comparePassword(password, customer.password))) {
                    throw new Error('Password does not match.');
                }

                return {
                    email,
                    name: customer.name,
                    id: customer._id.toString(),
                };
            },
        }),
    ],
    secret: env.authSecret,
    session: {
        strategy: 'jwt',
    },
    debug: true,
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token }) {
            return {
                ...session,
                user: {
                    // ...token,
                    email: token.email,
                    id: token.id,
                    name: token.name,
                },
            };
        },
    },
};

export default NextAuth(authOptions);
