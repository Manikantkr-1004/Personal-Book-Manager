import { NextResponse } from 'next/server';

// Defined paths that don't require authentication
const noneAuthPaths = [
    '/auth/login',
    '/auth/signup',
];

export default async function proxy(request) {

    const path = request.nextUrl.pathname;
    const isNoneAuthPaths = noneAuthPaths.includes(path);
    const token = request.cookies.get('auth-token')?.value;
    const redirectTo = request.nextUrl.searchParams.get('redirectTo');

    let isLoggedIn = false;

    // Checking User loggedin status by backend
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth`, {
            headers: {
                Cookie: `auth-token=${token}`,
            },
            cache: "no-store"
        });
        // const data = await response.json();j
        // data.data is the user data
        isLoggedIn = response.status === 200;
    } catch (error) {
        isLoggedIn = false;
    }

    // If user not logged in and trying to access protected routes, redirecting to login page
    if (!isLoggedIn && !isNoneAuthPaths) {
        const redirectUrl = new URL('/auth/login', request.url);
        redirectUrl.searchParams.set('redirectTo', path);
        return NextResponse.redirect(redirectUrl);
    }

    // If user is logged in and trying to access auth routes, redirecting to home page
    if (isLoggedIn && isNoneAuthPaths) {
        return NextResponse.redirect(new URL(redirectTo ?? '/', request.url));
    }

    // When everything is fine, Go with the request
    return NextResponse.next();
}

// Applying middleware for these URLs
export const config = {
    matcher: ['/auth/:path*', '/user/:path*'],
};