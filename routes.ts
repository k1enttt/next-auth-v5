/**
 * Array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
];

/**
 * Array of routes that are used for authentication.
 * These routes will redirect logged in users to the default login redirect.
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login", 
    "/auth/register",
    "/auth/error",
];

/**
 * Prefix for API authentication routes.
 * Routes that start with this prefix are used for authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect route after login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";