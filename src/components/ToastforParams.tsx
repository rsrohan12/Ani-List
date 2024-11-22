"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastforParams() {
  const params = useSearchParams();

  useEffect(() => {
    if(params?.get("error")){
      toast.error(params.get("error"), {theme: "colored"})
      setTimeout(() => {
        history.replaceState(null, "", window.location.pathname); // Clear query params
      }, 1000);
    }
    else if (params?.get("success")) {
      toast.success(params.get("success"), { theme: "colored" });
      setTimeout(() => {
        history.replaceState(null, "", window.location.pathname); // Clear query params
      }, 1000);
    }
  }, [params.toString()])

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default ToastforParams;
