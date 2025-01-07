import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { DefaultPagination } from "../ui/pagination";

const CustomerOrdersTable = ({ orders }) => {
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalFilteredOrders = orders.length;
  const paginatedOrders = orders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(totalFilteredOrders / rowsPerPage);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {totalFilteredOrders > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {order.items[0].product_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {order.order_status}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    ₱ {order.total_amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-sm text-gray-500 border-b"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {totalFilteredOrders > 0 && (
        <footer className="flex flex-col-reverse md:flex-row  justify-between items-center mt-4 gap-y-2">
          <div>
            <span className="text-sm text-gray-600">
              Showing {rowsPerPage * (currentPage - 1) + 1} to{" "}
              {Math.min(rowsPerPage * currentPage, totalFilteredOrders)} of{" "}
              {totalFilteredOrders} entries
            </span>
          </div>

          <div className="mt-4 flex justify-center">
            <DefaultPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </footer>
      )}
    </>
  );
};

CustomerOrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      order_status: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CustomerOrdersTable;
