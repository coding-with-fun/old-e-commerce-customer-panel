import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className="h-screen">
            <Component {...pageProps} />
        </main>
    );
}
