function SingleTicketSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-5 bg-white rounded-md w-80 md:w-120 lg:w-150 wrap-break-word">
      <div className="h-7 bg-gray-300 rounded-xl animate-pulse w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-xl animate-pulse w-1/5"></div>
      <div className="h-4 bg-gray-200 rounded-xl animate-pulse w-[90%]"></div>
      <div className="h-4 bg-gray-200 rounded-xl animate-pulse w-1/2"></div>
    </div>
  );
}

export default SingleTicketSkeleton;