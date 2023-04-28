import withoutAuth from '@/HOC/withoutAuth';
import env from '@/libs/env';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import React, { Fragment } from 'react';

const SignIn = () => {
    const handleGitHubSignIn = () => {
        signIn('github', {
            callbackUrl: env.authUrl,
        });
    };

    return (
        <Fragment>
            <Head>
                <title>Sign In</title>
            </Head>

            <div className="px-5">
                <button onClick={handleGitHubSignIn}>Sign In</button>
            </div>
        </Fragment>
    );
};

export default withoutAuth(SignIn);
