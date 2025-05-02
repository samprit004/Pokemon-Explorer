import React, { useState } from 'react';

const Pagination = ({ 
  itemsPerPage: initialItemsPerPage, 
  totalItems, 
  currentPage, 
  paginate,
  onItemsPerPageChange
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    onItemsPerPageChange(newItemsPerPage);
    // Reset to first page when changing items per page
    paginate(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
      {/* Items per page selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      {/* Pagination controls */}
      <nav className="flex items-center gap-1">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          &laquo; Prev
        </button>

        {getPageNumbers().map((number, index) => (
          number === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1 text-sm">...</span>
          ) : (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md border text-sm ${currentPage === number ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              {number}
            </button>
          )
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          Next &raquo;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;