import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import withoutAuth from '@/HOC/withoutAuth';
import env from '@/libs/env';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { SignInFormSchema } from './schema';
import PasswordInput from '@/components/PasswordInput';
import toast from '@/libs/toast';

const SignIn = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: toFormikValidationSchema(SignInFormSchema),
        onSubmit: async (values) => {
            const status = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: '/',
            });

            if (status && !status.ok && status.error) {
                toast(status.error);
            }
        },
    });

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
                    noValidate
                    component="form"
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                    sx={{
                        mt: 1,
                    }}
                >
                    <TextField
                        fullWidth
                        autoFocus
                        id="email"
                        label="Email"
                        variant="outlined"
                        margin="dense"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email === true &&
                            Boolean(formik.errors.email)
                        }
                        helperText={
                            formik.touched.email === true && formik.errors.email
                        }
                    />

                    <PasswordInput
                        fullWidth
                        id="password"
                        label="Password"
                        margin="dense"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        inputerror={{
                            error: formik.touched.password,
                            helperText: formik.errors.password,
                        }}
                    />

                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        type="submit"
                        sx={{
                            mt: 3,
                            mb: 2,
                        }}
                    >
                        Sign In
                    </Button>
                </Box>

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
        </Fragment>
    );
};

export default withoutAuth(SignIn);
