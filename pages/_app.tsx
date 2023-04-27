import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';

import Outlet from '@/HOC/Outlet';
import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{
    session: Session;
}>) {
    return (
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
    );
}
