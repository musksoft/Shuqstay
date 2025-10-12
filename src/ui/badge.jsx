import React from "react";
import { cn } from "./util";

export function Badge({ children, className = "", variant = "default", ...props }) {
  const base = "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-md w-fit whitespace-nowrap";

  const variants = {
    default: "bg-olive text-white",
    secondary: "bg-gray-200 text-gray-800",
    outline: "border border-gray-300 text-gray-700",
    destructive: "bg-red-500 text-white",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}

export default Badge;
