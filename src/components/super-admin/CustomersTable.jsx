import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Input,
  IconButton,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { DefaultPagination } from "../ui/pagination";
import { useNavigate } from "react-router-dom";

const CustomersTable = ({ customers }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = customers.filter((customer) => {
        const fullName = [
          customer.first_name,
          customer.middle_name && customer.middle_name.trim()
            ? customer.middle_name
            : "", // Check for non-null and non-empty middle_name
          customer.last_name,
        ]
          .filter((name) => name) // Filter out any empty strings
          .join(" "); // Join remaining names with a space

        return (
          customer.user_email.toLowerCase().includes(lowercasedTerm) ||
          fullName.toLowerCase().includes(lowercasedTerm)
        );
      });
      setFilteredCustomers(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(debounceTimeout); // Cleanup on component unmount or searchTerm change
  }, [searchTerm, customers]);

  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      if (sortConfig.key) {
        const aValue =
          sortConfig.key === "full_name"
            ? `${a.first_name} ${a.middle_name} ${a.last_name}`.toLowerCase()
            : a[sortConfig.key]?.toLowerCase();
        const bValue =
          sortConfig.key === "full_name"
            ? `${b.first_name} ${b.middle_name} ${b.last_name}`.toLowerCase()
            : b[sortConfig.key]?.toLowerCase();

        if (sortConfig.direction === "asc") {
          return aValue < bValue ? -1 : 1;
        } else if (sortConfig.direction === "desc") {
          return aValue > bValue ? -1 : 1;
        }
      }
      return 0;
    });
  }, [filteredCustomers, sortConfig]);

  const handleSort = (columnKey) => {
    setSortConfig((prevState) => {
      if (prevState.key === columnKey) {
        if (prevState.direction === "asc") {
          return { key: columnKey, direction: "desc" };
        } else if (prevState.direction === "desc") {
          return { key: null, direction: null };
        }
      }
      return { key: columnKey, direction: "asc" };
    });
  };

  const handleViewCustomer = (customer) => {
    console.log("View customer:", customer);
    navigate(`/admin/customer-profile/${customer.user}`);
  };

  const totalFilteredCustomers = sortedCustomers.length;
  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(totalFilteredCustomers / rowsPerPage);

  const headers = [
    { key: "customer_id", label: "Customer ID" },
    { key: "user_email", label: "Email" },
    { key: "full_name", label: "Full Name" },
    { key: "user_dept", label: "Department" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <section>
      <header className=" w-full sm:w-[250px] mb-5 ">
        <Input
          label="Search Email or Full Name"
          value={searchTerm}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="lg"
          className="w-auto"
        />
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              {headers.map(({ key, label }) => (
                <th
                  key={key}
                  className={`p-4 text-left hover:bg-gray-600 hover:text-white ${
                    key === "actions" ? "" : "cursor-pointer"
                  }`}
                  onClick={() => key !== "actions" && handleSort(key)}
                >
                  <p className="flex flex-row items-center">
                    <span>{label}</span>
                    {key !== "actions" && sortConfig.key === key && (
                      <span>
                        {sortConfig.direction === "asc" ? (
                          <ChevronDownIcon className="h-4 w-4 inline-block ml-1" />
                        ) : (
                          <ChevronUpIcon className="h-4 w-4 inline-block ml-1" />
                        )}
                      </span>
                    )}
                  </p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {totalFilteredCustomers > 0 ? (
              paginatedCustomers.map((customer) => (
                <tr
                  key={customer.customer_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-2 w-20">{customer.customer_id}</td>
                  <td className="p-2 w-60">{customer.user_email}</td>
                  <td className="p-2 w-60">
                    {[
                      customer.first_name,
                      customer.middle_name || "", // If middle_name is null or empty, use an empty string
                      customer.last_name,
                    ]
                      .filter((name) => name) // Filter out any empty or null values
                      .join(" ") || "No Name"}
                
                  </td>
                  <td className="p-2 w-40">{customer.user_dept}</td>
                  <td className="p-2 w-10">
                    <div className="flex items-center justify-center gap-x-2">
                      <IconButton
                        variant="text"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        <PencilIcon className="h-5 w-5 text-black" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 1} className="p-4 text-center">
                  <span className="flex items-center gap-x-2 justify-center">
                    <XCircleIcon className="h-5 w-5" />
                    No customers found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalFilteredCustomers > 0 && (
        <div className="mt-4 flex justify-center">
          <DefaultPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </section>
  );
};

export default CustomersTable;
