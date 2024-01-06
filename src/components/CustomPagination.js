import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "react-feather";

function CustomPagination({
  currentPage,
  handlePageChange,
  startIndex,
  endIndex,
  totalPages,
  searchTerm,
}) {
  return searchTerm === "" && totalPages > 1
  ? (
    <div className="flex justify-center mt-4 gap-4">
      {currentPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="px-3 py-2  rounded cursor-pointer text-blue-500 hover:bg-blue-900 hover:text-white"
          >
            <ChevronsLeft />
          </button>

          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-2  rounded cursor-pointer text-blue-500 hover:bg-blue-900 hover:text-white"
          >
            <ChevronLeft />
          </button>
        </>
      )}

      {[...Array(endIndex - startIndex + 1)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(startIndex + index)}
          className={`px-5 py-2 rounded cursor-pointer ${
            currentPage === startIndex + index
              ? "bg-blue-500 text-white"
              : "text-blue-500 hover:bg-blue-900 hover:text-white"
          }`}
        >
          {startIndex + index}
        </button>
      ))}
      {totalPages > 3 && currentPage < totalPages - 2 && (
        <span className="px-5 py-2 rounded">...</span>
      )}
      {currentPage < totalPages && (
        <>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-2 rounded cursor-pointer text-blue-500 hover:bg-blue-900 hover:text-white"
          >
            <ChevronRight />
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-3 py-2 rounded cursor-pointer text-blue-500 hover:bg-blue-900 hover:text-white"
          >
            <ChevronsRight />
          </button>
        </>
      )}
    </div>
  ) : null;
}

export default CustomPagination;
