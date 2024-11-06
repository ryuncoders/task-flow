import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session/get";

interface Routes {
  [key: string]: boolean;
}

const defaultRouts: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exits = defaultRouts[request.nextUrl.pathname];

  if (!session.isLoggedIn) {
    if (!exits) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exits) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
