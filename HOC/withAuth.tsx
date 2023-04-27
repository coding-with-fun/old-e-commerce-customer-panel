import { NextComponentType, NextPageContext } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const withAuth = (Component: NextComponentType<NextPageContext, any, {}>) => {
    const Session = (props: any) => {
        const session = useSession();
        const { push } = useRouter();

        if (session.status === 'loading') {
            return <div>Loading...</div>;
        }

        if (session.status === 'unauthenticated') {
            push('/signin');
            return;
        }

        return <Component {...props} />;
    };

    if (Component.getInitialProps) {
        Session.getInitialProps = Component.getInitialProps;
    }

    return Session;
};

export default withAuth;
