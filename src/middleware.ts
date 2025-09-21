import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // 追加のロジックがあればここに記述
    console.log("✅ Next-auth認証済み - アクセス許可:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // /adminパスへのアクセスは認証が必要
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
