import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    accessToken?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      accessToken?: string;
      image?: string | null;
    };
  }

  interface JWT {
    id: string;
    role: string;
    accessToken?: string;
  }
}
