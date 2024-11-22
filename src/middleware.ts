import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {

  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getUser()

  if (data.user == null) { // agr user logout h toh use redirect krdo home page pe with error
    return NextResponse.redirect(
      new URL("/?error=Please login first to access this route.", request.url)
    );
  }

  return NextResponse.next();
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    "/dashboard",
    "/anime-list",
    "/manga-list",
    "/anime-category_list",
    "/settings"
  ],
}