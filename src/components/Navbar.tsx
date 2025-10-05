// src/components/Navbar.tsx
"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconUser, IconWorldQuestion } from "@tabler/icons-react";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";

export default function Navbar() {
  const { user, session } = useAuthStore(); // Add session here

  console.log("Auth State:", { user, session }); // Debug log

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Questions",
      link: "/questions",
      icon: (
        <IconWorldQuestion className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  if (user)
    navItems.push({
      name: "Profile",
      link: `/users/${user.$id}/${slugify(user.name)}`,
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    });

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
