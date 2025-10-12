// components/ui/dialog.jsx
"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "./util";

// Wrapper
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      className={cn("fixed inset-0 bg-black/50", className)}
      {...props}
    />
  );
}

export function DialogContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 max-w-lg w-full bg-white p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2",
          className
        )}
        {...props}
      >
        {children}
        <DialogClose className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X className="w-5 h-5" />
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className = "", children }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function DialogTitle({ className = "", ...props }) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

export function DialogDescription({ className = "", ...props }) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
}

export function DialogFooter({ className = "", children }) {
  return <div className={cn("mt-6 flex justify-end gap-2", className)}>{children}</div>;
}
