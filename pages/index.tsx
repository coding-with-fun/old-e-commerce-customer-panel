import env from '@/libs/env';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

            <Box>
                <Typography>Home</Typography>

                <Button variant="outlined">Home</Button>
            </Box>
        </Fragment>
    );
};

export default Home;
