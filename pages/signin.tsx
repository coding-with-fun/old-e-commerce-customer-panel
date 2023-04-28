import GitHubIcon from '@mui/icons-material/GitHub';
import withoutAuth from '@/HOC/withoutAuth';
import env from '@/libs/env';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

const SignIn = () => {
    const handleGitHubSignIn = () => {
        signIn('github', {
            callbackUrl: env.authUrl,
        });
    };

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const status = await signIn('credentials', {
            redirect: false,
            email: 'dev@harrsh.com',
            password: 'Abcd@1234',
            callbackUrl: '/',
        });
        console.log({
            status,
        });
    };

    return (
        <Fragment>
            <Head>
                <title>Sign In</title>
            </Head>

            <Box
                className="flex flex-col items-center justify-center mx-auto h-full"
                sx={{
                    maxWidth: '23rem',
                }}
            >
                <Typography component="h1" variant="h4">
                    Sign in
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSignIn}
                    noValidate
                    sx={{
                        mt: 1,
                    }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Typography variant="body2">
                                <Link href="/forgot-password">
                                    Forgot password?
                                </Link>
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography variant="body2">
                                <Link href="/signup">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        className="mt-6 text-white bg-black hover:text-black hover:bg-white"
                        fullWidth
                        startIcon={<GitHubIcon />}
                        onClick={handleGitHubSignIn}
                    >
                        Sign In with GitHub
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
};

export default withoutAuth(SignIn);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query, req, res } = context;
    var error: string | string[] | undefined = '';
    if (Boolean(query.error)) {
        error = query.error;
    }

    try {
        const secret = process.env.NEXTAUTH_SECRET;
        const token = await getToken({ req, secret });

        return {
            props: { providers: await getProviders(), loginError: error },
        };
    } catch (e) {
        return {
            props: { providers: await getProviders(), loginError: error },
        };
    }
};
