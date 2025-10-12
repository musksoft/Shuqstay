import React from "react";
import { cn } from "./util.js";

export function Card({ children, className = "", ...props }) {
  return (
    <div className={cn("bg-white text-gray-900  border", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={cn("px-4 py-3", className)} {...props}>
      {children}
    </div>
  );
}
