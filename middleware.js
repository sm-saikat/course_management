
import {withAuth} from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req){
        const pathname = req.nextUrl.pathname;
        const token = req.nextauth.token;
        console.log('middleware called', pathname);
        console.log('role', token.user?.role)

        const lecturerPaths = ['/courses/create', '/courses/edit', '/courses/delete', '/assignments/create', '/assignments/edit', '/assignments/delete'];

        // Check if pathname starts with any of lectuerPaths
        if(lecturerPaths.some(path => pathname.startsWith(path)) && token.user?.role !== 'lecturer'){
            return NextResponse.redirect(new URL('/', req.nextUrl));
        }
        
    }
)

export const config = {
    matcher: ['/dashboard', '/courses/:path*', '/assignments/:path*', '/about', '/contact', '/profile']
}