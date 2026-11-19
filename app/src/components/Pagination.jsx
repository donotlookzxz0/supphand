function Pagination({ page, hasNext, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-3">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 rounded bg-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        &larr;
      </button>
      <span className="font-semibold">{page}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
        className="px-3 py-1 rounded bg-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        &rarr;
      </button>
    </div>
  );
}

export default Pagination;