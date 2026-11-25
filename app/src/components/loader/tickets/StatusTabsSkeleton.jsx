function StatusTabsSkeleton() {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="px-3 py-1 rounded-full border border-gray-200 bg-gray-300 animate-pulse w-20 h-7"
        ></div>
      ))}
    </div>
  );
}

export default StatusTabsSkeleton;