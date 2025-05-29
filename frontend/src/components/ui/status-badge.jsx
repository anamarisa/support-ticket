import { cn } from "@/lib/utils";

export const StatusBadge = ({ status }) => {
  const map = {
    open: "bg-green-100 text-green-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    closed: "bg-red-100 text-red-800",
  };

  const formatLabel = (status) =>
    typeof status === "string"
      ? status
          .toLowerCase()
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";

  return (
    <span
      className={cn(
        "px-2 py-1 rounded-md text-sm font-medium",
        map[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      {formatLabel(status)}
    </span>
  );
};
