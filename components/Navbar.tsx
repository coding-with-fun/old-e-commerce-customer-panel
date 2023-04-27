import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className="flex px-4 py-3">
            <div className="flex-1"></div>

            <div className="flex gap-4">
                <Link href={'/'}>Home</Link>
                <Link href={'/profile'}>Profile</Link>
                <Link href={'/about'}>About</Link>
                <Link href={'/signin'}>Sign In</Link>

                <p className="cursor-pointer">Sign Out</p>
            </div>
        </div>
    );
};

export default Navbar;
