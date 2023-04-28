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
                        <div className="h-screen">
                            <Navbar />

                            <main>
                                <Component {...pageProps} />
                            </main>
                        </div>
                    </Outlet>
                </SessionProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
