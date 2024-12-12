"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, User, LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LoginSidebar } from "./LoginSidebar";
import { DropdownMenuDemo} from "./EditProfile";
import { getS3ImageUrl } from "@/lib/utils";
import EnhancedActivity from "./EnhancedActivity";

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
  const [loginTime, setLoginTime] = useState<string | null>()
  const [pickQuery, setPickQuery] = useState<string>("")
  const supabase = createClientComponentClient();

  const updatePickQueryFromStorage = () => {
    // pick query from local storage set in AnimeList.tsx and MangaList.tsx
    const queryAnimeSearch = localStorage.getItem('query');
    if (queryAnimeSearch) {
      const editQuery = `${queryAnimeSearch.charAt(0).toUpperCase()}${queryAnimeSearch.substring(1)}`;
      setPickQuery(editQuery);
    } else {
      setPickQuery("");
    }
  }; 

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

      // Set login time if not already set when user is logged in
      const storedLoginTime = localStorage.getItem('loginTime');
      if (!storedLoginTime) {
        const currentTime = new Date().toLocaleString();
        localStorage.setItem('loginTime', currentTime);
        setLoginTime(currentTime);
        console.log('User signed in at:', currentTime);
      } else {
        setLoginTime(storedLoginTime);
      }

      // Fetch and update the query from localStorage when the page is loaded
      updatePickQueryFromStorage()
      
    } else {
      setUserData({ name: null, email: null });
      setIsGuest(true);
    }
  };

  useEffect(() => {
    fetchUserData();

     // Check if there's a stored login time in localStorage
    const storedLoginTime = localStorage.getItem('loginTime');
    if (storedLoginTime) {
      setLoginTime(storedLoginTime);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchUserData();
        
      } else if (event === 'SIGNED_OUT') {
        setUserData({ name: null, email: null });
        setIsGuest(true);

        // Clear the stored login time on sign-out
        localStorage.removeItem('loginTime');
        setLoginTime(null);

        // Clear the stored query on sign-out
        localStorage.removeItem('query');
        setPickQuery("");
      }
    });


    // Set up an interval to check for query changes
    const intervalId = setInterval(updatePickQueryFromStorage, 1000);

    return () => {
      authListener.subscription.unsubscribe();
      clearInterval(intervalId);
    };
  }, []);

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
              <span className="text-muted-foreground text-sm">No recent activity</span>
            ) : (
              <div className="space-y-4">
                <EnhancedActivity loginTime={loginTime || null} pickQuery={pickQuery}/>
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