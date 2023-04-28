import env from '@/libs/env';
import interceptor from '@/utils/interceptor';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';

const Navbar = () => {
    const { status } = useSession();

    const initAPI = async () => {
        const data = await interceptor.get('/hello');

        console.log({
            data: data.data,
        });
    };

    useEffect(() => {
        if (status === 'authenticated') {
            initAPI();
        }
    }, [status]);

    return (
        <div className="flex px-4 py-3">
            <div className="flex-1"></div>

            <div className="flex gap-4">
                <Link href={'/'}>Home</Link>

                {status === 'authenticated' ? (
                    <Link href={'/profile'}>Profile</Link>
                ) : null}

                <Link href={'/about'}>About</Link>

                {status === 'authenticated' ? (
                    <p
                        className="cursor-pointer"
                        onClick={() => {
                            signOut();
                        }}
                    >
                        Sign Out
                    </p>
                ) : (
                    <Link href={'/signin'}>Sign In</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
