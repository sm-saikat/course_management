'use client';

import {SessionProvider} from 'next-auth/react';

const withSession = (WrappedComponent) => {
    return (props) => {
        return (
            <SessionProvider>
                <WrappedComponent {...props} />
            </SessionProvider>
        );
    };
};


export default withSession;