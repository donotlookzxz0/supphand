function TableSkeleton({ columns = 4, rows = 5 }) {
  return (
    <div>
      <div className="overflow-auto hidden md:block">
        <table className="bg-white rounded-md table-fixed w-full text-left">
          <thead className="border-b border-gray-200 rounded-base border-default">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-b border-gray-100">
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-6 py-3">
                    <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full max-w-2xs"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:hidden">
        <ul className="flex flex-col gap-2">
          {Array.from({ length: rows }).map((_, i) => (
            <li key={i} className="bg-white p-3 rounded-md space-y-3">
              <div className="flex items-center space-x-2">
                <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-32"></div>
                <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-14"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-24"></div>
              <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-40"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TableSkeleton;