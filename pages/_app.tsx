import Outlet from '@/HOC/Outlet';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import createEmotionCache from '@/utils/createEmotionCache';
import theme from '@/utils/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps
    extends AppProps<{
        session: Session;
    }> {
    emotionCache: EmotionCache;
}

export default function App({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
}: MyAppProps) {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <SessionProvider session={session} refetchOnWindowFocus={false}>
                    <Outlet>
                        <div className="h-screen flex flex-col">
                            <Navbar />

                            <main className="flex-1">
                                <Component {...pageProps} />
                            </main>
                        </div>

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </Outlet>
                </SessionProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
