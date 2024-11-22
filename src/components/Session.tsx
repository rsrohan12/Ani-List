import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Navbar } from "./Navbar";
import { cookies } from "next/headers";

// export async function Session() {
//   // const supabase = createServerComponentClient({cookies})
//   // const {data} = await supabase.auth.getSession()
//   return (
//     // <Navbar session = {data.session?.user}/>
//   )
// }
