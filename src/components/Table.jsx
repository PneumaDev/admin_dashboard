import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";

export default function Table({
  columnHeader,
  products,
  renderRow,
  fetchMoreData,
  count,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { performedSearch } = useContext(AdminContext);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fetch more data when on the last page and more data is available
  useEffect(() => {
    if (currentPage === totalPages && products.length <= count) {
      fetchMoreData(currentPage);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-[var(--table-header)]">
            <tr>
              {Object.values(columnHeader).map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 font-imprima text-left text-xs font-medium text-[var(--text-color)] transition-standard uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[var(--bg-sidecolor)] divide-y divide-[var(--border-color)]">
            {currentItems.map((item, index) =>
              renderRow(item, indexOfFirstItem + index)
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-gray-200 bg-[var(--table-header)] px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Mobile Pagination (Previous & Next Only) */}
          <div className="flex-1 flex items-center justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-black transition-standard hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-black transition-standard hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Desktop Pagination (Numbered) */}
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--text-color)] font-yantramanav">
              Showing{" "}
              <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(indexOfLastItem, products.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {performedSearch ? products.length : count}
              </span>{" "}
              results
            </p>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-black transition-standard hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Page Numbers - Only Show Previous, Current, and Next */}
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-gray-400 border-gray-300 text-[var(--text-color)] transition-standard hover:text-[var(--bg-color)]"
                >
                  {currentPage - 1}
                </button>
              )}

              <button className="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-gray-800 border-blue-500 text-white">
                {currentPage}
              </button>

              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-gray-400 border-gray-300 text-[var(--text-color)] transition-standard hover:text-[var(--bg-color)]"
                >
                  {currentPage + 1}
                </button>
              )}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-black transition-standard hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
