import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Loader({ className, ...props }) {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={cn("h-6 w-6 animate-spin", className)} {...props} />
    </div>
  );
}
