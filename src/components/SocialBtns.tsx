import { Github, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";

export default function SocialBtns() {
    const supabase = createClientComponentClient()

    // for github login
    const githubLogin = async() => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        })

        if(error){
            toast.error(error.message, {theme: "colored"})
        }
    }

    // for google login
    const googleLogin = async() => {
      const {error} = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
              redirectTo: `${location.origin}/auth/callback`
          }
      })

      if(error){
          toast.error(error.message, {theme: "colored"})
      }
    }
  return (
    <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" onClick={githubLogin}>
            <Github className="mr-2 h-4 w-4" />
            Github
        </Button>
        <Button variant="outline" type="button" onClick={googleLogin}>
            <Mail className="mr-2 h-4 w-4" />
            Google
        </Button>
    </div>
  )
}
