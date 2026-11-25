function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-4 mt-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-8 h-8 rounded-md bg-gray-300 animate-pulse"></div>
      ))}
    </div>
  );
}

export default PaginationSkeleton;