import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse h-full w-full rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton }
