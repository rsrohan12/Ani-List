"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, LogIn, Menu, X, LogOut } from 'lucide-react';
import { ThemeToggle } from "./ThemeToggle";
import { ProfileSidebar } from "./ProfileSidebar";
import { LoginSidebar } from "./LoginSidebar";
import FilterCategory from "./FilterCategories";
import { usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from '@supabase/supabase-js'
import { SignoutBtn } from "./SignoutBtn";

export function Navbar({ initialSession }: { initialSession: Session | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const pathname = usePathname()
  const [user, setUser] = useState(initialSession?.user || null);

  const supabase = createClientComponentClient();

  const intialUser = {
    name: initialSession?.user.user_metadata.name || null,
    email: initialSession?.user.email || null
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      setIsHome(true);
      setIsDashboard(false);
    } else if (pathname === "/dashboard") {
      setIsHome(false);
      setIsDashboard(true);
    } else {
      setIsHome(false);
      setIsDashboard(false);
    }
  }, [pathname]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user || null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-background"
      )}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity"
          >
            <Home className="w-6 h-6" />
            <span className="font-semibold text-lg hidden sm:block">Ani-List</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {isHome ? <span className="border-b-2 border-muted-foreground">Home</span> : "Home"}
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1"
            >
              <LayoutDashboard className="w-4 h-4" />
              {isDashboard ? <span className="border-b-2 border-muted-foreground">Dashboard</span> : "Dashboard"}
            </Link>
            <FilterCategory />
            <ThemeToggle />
            {user ? (
              <SignoutBtn />
            ) : (
              <Button variant="default" size="sm" className="ml-4" onClick={() => setIsLoginOpen(true)}>
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
            <div className="border-l pl-4">
              <ProfileSidebar newSession={intialUser}/>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <ProfileSidebar newSession={intialUser}/>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen
            ? "max-h-56 border-b bg-background"
            : "max-h-0 overflow-hidden"
        )}
      >
        <div className="px-4 py-2 space-y-1">
          <Link
            href="/"
            className="flex items-center space-x-2 p-3 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 p-3 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <div className="p-3">
            {user ? (
              <SignoutBtn />
            ) : (
              <Button
                className="w-full"
                variant="default"
                size="sm"
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      <LoginSidebar 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
      />
    </nav>
  );
}

