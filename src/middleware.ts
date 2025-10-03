// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard"] };

// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Redirect unauthenticated users to /login
  pages: {
    signIn: "/login", // <-- your custom login page
  },
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"], // protect /dashboard route
};
