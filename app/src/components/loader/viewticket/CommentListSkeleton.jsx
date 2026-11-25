function CommentListSkeleton() {
  return (
    <ul>
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          className="p-5 border-b border-gray-200 w-80 md:w-120 lg:w-150 wrap-break-word"
          key={i}
        >
          <div className="h-6 bg-gray-300 rounded-xl animate-pulse w-1/3"></div>
          <div className="p-5 flex flex-col gap-2">
            <div className="h-5 bg-gray-200 rounded-xl animate-pulse w-[80%]"></div>
            <div className="h-5 bg-gray-200 rounded-xl animate-pulse w-1/2"></div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentListSkeleton;