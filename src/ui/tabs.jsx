// components/ui/tabs.jsx
"use client";

import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "./util.js";

// Root container for tabs
export const Tabs = ({ className, ...props }) => (
  <TabsPrimitive.Root className={cn("flex flex-col gap-2", className)} {...props} />
);

// The tab buttons container
export const TabsList = ({ className, ...props }) => (
  <TabsPrimitive.List className={cn("flex gap-2", className)} {...props} />
);

// Each individual tab button
export const TabsTrigger = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      "px-4 py-2 text-sm rounded-md border border-transparent hover:bg-gray-100 data-[state=active]:bg-white data-[state=active]:border-gray-300",
      className
    )}
    {...props}
  />
);

// Tab panel content
export const TabsContent = ({ className, ...props }) => (
  <TabsPrimitive.Content className={cn("p-4", className)} {...props} />
);
