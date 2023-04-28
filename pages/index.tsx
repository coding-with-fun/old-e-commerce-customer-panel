import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import { Fragment } from 'react';

const Home = () => {
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
