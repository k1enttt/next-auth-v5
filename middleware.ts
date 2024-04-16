import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

const { auth } = NextAuth(authConfig);
 

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // If the route is an API auth route, don't authenticate.
    if (isApiAuthPrefix) {
        return;
    }

    // If the route is a public route and the user is logged in, redirect to the default login redirect.
    if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    // If the route is not a public route and the user is not logged in, redirect to the login page.
    if (!isPublicRoute && !isLoggedIn) { 
        return Response.redirect(new URL('/auth/login', nextUrl));
    }

    return ;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: [
        // Exclude files with a "." followed by an extension, which are typically static files.
        // Exclude files in the _next directory, which are Next.js internals.
        "/((?!.+\\.[\\w]+$|_next).*)",
        // Re-include any files in the api or trpc folders that might have an extension
        "/(api|trpc)(.*)",
    ],
};
