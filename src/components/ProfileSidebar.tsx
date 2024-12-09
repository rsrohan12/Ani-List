"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, User, LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LoginSidebar } from "./LoginSidebar";
import { DropdownMenuDemo} from "./EditProfile";
import { getS3ImageUrl } from "@/lib/utils";

interface UserData {
  name: string | null;
  email: string | null;
}

export function ProfileSidebar({newSession}: {newSession : UserData}) {

  const [open, setOpen] = useState(false);
  const [isGuest, setIsGuest] = useState<boolean>();
  const [userData, setUserData] = useState<UserData>(newSession);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [imgurl, setImgurl] = useState<string>("");
  const supabase = createClientComponentClient();

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profileData, error } = await supabase
        .from('add-photo')
        .select('image')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching profile data:', error);
      }

      setImgurl(profileData?.image)

      setUserData({
        name: user.user_metadata.name || null,
        email: user.email || null,
      });

      setIsGuest(false);
    } else {
      setUserData({ name: null, email: null });
      setIsGuest(true);
    }
  };

  useEffect(() => {
    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchUserData();
      } else if (event === 'SIGNED_OUT') {
        setUserData({ name: null, email: null });
        setIsGuest(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    setIsGuest(true);
  };

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
          <Avatar className="h-8 w-8">
            {isGuest ? (
              <AvatarImage className="dark:bg-white" src="https://img.icons8.com/?size=100&id=98957&format=png&color=000000" alt="Guest" />
            ) : (
              <AvatarImage src={imgurl ? getS3ImageUrl(imgurl) : "https://github.com/shadcn.png"} alt="Profile" />
            )}
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="flex items-center space-x-4">
          <DropdownMenuDemo checkState={isGuest ?? false} onImageUpdate={fetchUserData} />
            <div>
               <h2 className="text-xl font-semibold">
                {userData.name
                  ? `${userData.name.charAt(0).toUpperCase()}${userData.name.slice(1)}`
                  : "Guest"
                }
              </h2>
              <p className="text-sm text-muted-foreground">{userData.email || "Not signed in"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Link href="/settings" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
            {isGuest ? (
              <Button variant="ghost" 
              className="w-full justify-start text-blue-300" 
              size="sm"
              onClick={() => {setIsLoginOpen(true)
                setOpen(false)}
              }
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            ) : (
              <Button variant="ghost" 
              className="w-full justify-start text-destructive" 
              size="sm"
              onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
            {isGuest ? (
              <span className="text-muted-foreground">No recent activity</span>
            ) : (
              <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">Updated your profile picture</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            )}
            
          </div>
        </div>
      </SheetContent>
      <LoginSidebar isOpen={isLoginOpen} 
      onClose={() => setIsLoginOpen(false)}
      />
    </Sheet>
  );
}