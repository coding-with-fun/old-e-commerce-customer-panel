import env from '@/libs/env';
import Head from 'next/head';
import { Fragment, useEffect } from 'react';

const Home = () => {
    const initAPI = async () => {
        const data = await fetch(`${env.apiUrl}/hello`);

        console.log({
            data: await data.json(),
        });
    };

    useEffect(() => {
        initAPI();
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Home</title>
            </Head>

            <div>
                <p>Home</p>
            </div>
        </Fragment>
    );
};

export default Home;
