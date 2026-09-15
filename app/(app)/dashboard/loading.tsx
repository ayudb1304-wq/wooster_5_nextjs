import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="flex flex-col gap-2 lg:col-span-12">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Skeleton className="h-64 rounded-xl lg:col-span-8" />
      <Skeleton className="h-64 rounded-xl lg:col-span-4" />
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-xl lg:col-span-3" />
      ))}
      <Skeleton className="h-80 rounded-xl lg:col-span-7" />
      <Skeleton className="h-80 rounded-xl lg:col-span-5" />
    </div>
  );
}
