import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Input,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { DefaultPagination } from "../ui/pagination";
import buzzar_api from "../../config/api-config";

const CustomersTable = ({ customers }) => {
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [userId, setUserId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const rowsPerPage = 5;

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = customers.filter((customer) => {
        const fullName = [
          customer.first_name,
          customer.middle_name?.trim() || "",
          customer.last_name,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          customer.user_email.toLowerCase().includes(lowercasedTerm) ||
          fullName.toLowerCase().includes(lowercasedTerm)
        );
      });
      setFilteredCustomers(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, customers]);

  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      if (sortConfig.key) {
        const aValue =
          sortConfig.key === "full_name"
            ? `${a.first_name} ${a.middle_name || ""} ${
                a.last_name
              }`.toLowerCase()
            : a[sortConfig.key];
        const bValue =
          sortConfig.key === "full_name"
            ? `${b.first_name} ${b.middle_name || ""} ${
                b.last_name
              }`.toLowerCase()
            : b[sortConfig.key];

        // Handle sorting for booleans
        if (sortConfig.key === "is_approved") {
          return sortConfig.direction === "asc"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        // Handle sorting for strings
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
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
    setSelectedCustomer(customer);
    setUserId(customer.user); // Set the selected customer's ID
    setSelectedStatus(customer.is_approved ? "Approved" : "Pending"); // Reflect current status
    toggleDialog(); // Open the dialog
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
    { key: "is_approved", label: "Approval Status" },
    { key: "actions", label: "Actions" },
  ];

  const handleEditStatus = async () => {
    try {
      const updatedStatus = selectedStatus === "Approved";
      console.log(`Update user ${userId} status to:`, updatedStatus);

      await buzzar_api.patch(`/customers/${userId}/`, {
        is_approved: updatedStatus,
      });

      // Update the status in the local customers array
      setFilteredCustomers((prev) =>
        prev.map((customer) =>
          customer.customer_id === selectedCustomer.customer_id
            ? { ...customer, is_approved: updatedStatus }
            : customer
        )
      );

      toggleDialog();

      window.location.reload();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <section>
      <header className="w-full sm:w-[250px] mb-5">
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
                      customer.middle_name || "",
                      customer.last_name,
                    ]
                      .filter(Boolean)
                      .join(" ") || "No Name"}
                  </td>
                  <td className="p-2 w-40">{customer.user_dept}</td>
                  <td className="p-2 w-40">
                    {customer.is_approved ? "Approved" : "Pending"}
                  </td>
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

      <Dialog open={isDialogOpen} size="sm" handler={toggleDialog}>
        <DialogHeader>
          <Typography variant="h4">Edit Account Status</Typography>
        </DialogHeader>
        <DialogBody>
          <Typography>
            Update the account status of{" "}
            {`${selectedCustomer.first_name} ${selectedCustomer.last_name}`}
          </Typography>
          <div className="mt-4 flex flex-col gap-2">
            <Radio
              name="storeStatus"
              label="Pending"
              value="Pending"
              checked={selectedStatus === "Pending"}
              onChange={() => setSelectedStatus("Pending")}
            />
            <Radio
              name="storeStatus"
              label="Approved"
              value="Approved"
              checked={selectedStatus === "Approved"}
              onChange={() => setSelectedStatus("Approved")}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={toggleDialog} className="mr-2">
            Cancel
          </Button>
          <Button variant="gradient" onClick={handleEditStatus}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
};

export default CustomersTable;
