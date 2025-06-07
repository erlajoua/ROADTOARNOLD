import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();
  
  // Toutes les routes qui passent par le middleware auront le cache désactivé
  // (le matcher exclut déjà les assets statiques)
  console.log(`🚫 No Cache: ${pathname}`);
  
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("Surrogate-Control", "no-store");
  
  return response;
}

// Matcher qui exclut les assets statiques mais capture tout le reste
export const config = {
  matcher: [
    // Toutes les routes sauf les assets statiques
    "/((?!_next/static|favicon).*)",
  ],
};