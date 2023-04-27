import withoutAuth from '@/HOC/withoutAuth';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import React, { Fragment } from 'react';

const SignIn = () => {
    return (
        <Fragment>
            <Head>
                <title>Sign In</title>
            </Head>

            <div className="px-5">
                <button
                    onClick={() => {
                        signIn('github');
                    }}
                >
                    Sign In
                </button>
            </div>
        </Fragment>
    );
};

export default withoutAuth(SignIn);
