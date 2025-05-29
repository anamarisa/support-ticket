import React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, children, ...props }) {
  return (
    <div className="w-full overflow-auto rounded-xl border border-gray-200 shadow-sm dark:border-gray-700">
      <table
        className={cn(
          "w-full caption-bottom text-sm text-gray-700 dark:text-gray-300",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export const TableHeader = ({ className, ...props }) => (
  <thead
    className={cn(
      "[&_tr]:border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800",
      className
    )}
    {...props}
  />
);

export const TableBody = ({ className, ...props }) => (
  <tbody
    className={cn(
      "[&_tr]:border-b [&_tr:last-child]:border-0 [&_tr:nth-child(even)]:bg-gray-50 dark:[&_tr:nth-child(even)]:bg-gray-900",
      className
    )}
    {...props}
  />
);

export const TableFooter = ({ className, ...props }) => (
  <tfoot
    className={cn(
      "bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-200",
      className
    )}
    {...props}
  />
);

export const TableRow = ({ className, ...props }) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
      className
    )}
    {...props}
  />
);

export const TableHead = ({ className, ...props }) => (
  <th
    className={cn(
      "h-12 px-6 text-left align-middle text-sm font-semibold text-gray-700 dark:text-gray-300",
      className
    )}
    {...props}
  />
);

export const TableCell = ({ className, ...props }) => (
  <td
    className={cn(
      "px-6 py-4 align-middle text-sm text-gray-600 dark:text-gray-300",
      className
    )}
    {...props}
  />
);

export const TableCaption = ({ className, ...props }) => (
  <caption
    className={cn(
      "my-4 text-sm text-gray-500 dark:text-gray-400",
      className
    )}
    {...props}
  />
);
