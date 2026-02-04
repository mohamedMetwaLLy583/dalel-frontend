"use client";
import React, { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";

export default function ScrollTriggerHOC({ children }) {
  const [showSection, setShowSection] = useState(false);

  return (
    <ScrollTrigger
      onEnter={() => {
        setShowSection(true);
      }}
    >
      {showSection && children}
    </ScrollTrigger>
  );
}
