/**
 * Phân thành 3 nhóm Routes:
 * 1. Public routes: là những routes không cần authenticate (/)
 * 2. Auth route: là những routes authenticate (login, register)
 * 3. Api auth prefix: là prefix của api authen routes
 * 
 * Và một biến DEFAULT_LOGIN_REDIRECT = "/login"
 */

/**
 * Array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Array of routes that are used for authentication.
 * These routes will redirect logged in users to the default login redirect.
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

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