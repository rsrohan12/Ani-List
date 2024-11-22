"use client";

import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "./ui/toaster";

function ToastforParams() {
  const params = useSearchParams();
  const { toast } = useToast()

  useEffect(() => {
    if(params?.get("error")){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: params.get("error")
      })
      setTimeout(() => {
        history.replaceState(null, "", window.location.pathname); // Clear query params
      }, 1000);
    }
    else if (params?.get("success")) {
      toast({
        title: "Login:",
        description: params.get("success"),
        className: "bg-blue-400/50 text-lg"
      })
      setTimeout(() => {
        history.replaceState(null, "", window.location.pathname); // Clear query params
      }, 1000);
    }
  }, [params.toString()])

  return (
    <div>
      <Toaster />
    </div>
  );
}

export default ToastforParams;
