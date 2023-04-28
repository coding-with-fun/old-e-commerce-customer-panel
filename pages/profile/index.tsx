import withAuth from '@/HOC/withAuth';
import Head from 'next/head';
import React, { Fragment } from 'react';

const Profile = () => {
    return (
        <Fragment>
            <Head>
                <title>Profile</title>
            </Head>

            <div>Profile</div>
        </Fragment>
    );
};

export default withAuth(Profile);
