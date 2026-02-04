"use client";
import React from "react";

export default function LoadingCircle() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin_fast rounded-full h-16 w-16 border-t-4 border-b-4 border-custom-maincolor"></div>
    </div>
  );
}
