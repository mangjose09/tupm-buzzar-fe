import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/super-admin/AdminHeader";
import {
  Typography,
  Card,
  CardBody,
  ButtonGroup,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import buzzar_api from "../../config/api-config";
import CustomersTable from "../../components/super-admin/CustomersTable";
const Admincustomers = () => {
  const [customerList, setCustomerList] = useState([]);
  const [filteredCustomers, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // "all", "pending", "approved"
  const [customerCounts, setCustomerCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      document.title = "Buzzar Admin || Customer Dashboard"; // Set your desired title

      try {
        setLoading(true);
        const response = await buzzar_api.get("/customers/");
        const sortedCustomers = response.data.sort(
          (a, b) => b.customer_id - a.customer_id
        );

        console.log("customers are", sortedCustomers);
        setCustomerList(sortedCustomers);

        // Calculate initial counts
        setCustomerCounts({
          total: sortedCustomers.length,
          pending: sortedCustomers.filter((customer) => !customer.is_approved)
            .length,
          approved: sortedCustomers.filter((customer) => customer.is_approved)
            .length,
        });

        // Set the filtered vendors to the full list initially
        setFilteredVendors(sortedCustomers);
      } catch (err) {
        setError("Failed to fetch vendor data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Function to filter vendors based on the selected status
  const handleFilterChange = (status) => {
    setFilterStatus(status);

    let filtered = [...customerList];
    if (status === "pending") {
      filtered = customerList.filter((customer) => !customer.is_approved);
    } else if (status === "approved") {
      filtered = customerList.filter((customer) => customer.is_approved);
    }
    setFilteredVendors(filtered);
  };

  return (
    <>
      <AdminHeader />
      <main className="min-h-screen px-6 md:px-24 py-5 md:py-10">
        <header>
          <Typography variant="h2" color="blue-gray">
            Welcome Back, Admin!
          </Typography>
          <Typography variant="lead" color="blue-gray">
            Here's an overview of the latest activity and insights from your
            customers.
          </Typography>
        </header>

        {/* Statistics Section */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[...Array(3)].map((_, idx) => (
              <Card key={idx}>
                <CardBody>
                  <div className="flex items-center gap-x-2 animate-pulse">
                    <div className="h-14 w-14 rounded-full bg-gray-300 "></div>
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-gray-300 rounded-full "></div>
                      <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Typography variant="lead" color="red" className="mt-5">
            {error}
          </Typography>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card>
              <CardBody className="flex items-center gap-4">
                <UsersIcon className="w-12 h-12 text-[#F6962E]" />
                <div>
                  <Typography variant="h5" color="black">
                    Total Customers
                  </Typography>
                  <Typography variant="h2" className="text-[#F6962E]">
                    {customerCounts.total}
                  </Typography>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <ClockIcon className="w-12 h-12 text-[#F6962E]" />
                <div>
                  <Typography variant="h5" color="black">
                    Pending Approval
                  </Typography>
                  <Typography variant="h2" className="text-[#F6962E]">
                    {customerCounts.pending}
                  </Typography>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <CheckCircleIcon className="w-12 h-12 text-[#F6962E]" />
                <div>
                  <Typography variant="h5" color="black">
                    Approved Customers
                  </Typography>
                  <Typography variant="h2" className="text-[#F6962E]">
                    {customerCounts.approved}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
        <div className="my-5 w-full border-2 rounded-full"></div>

        {/* CONDITIONAL FILTER COMPONENT */}
        <div className="mb-5">
          {/* Select for smaller screens */}
          <div className="sm:hidden">
            <Select
              value={filterStatus}
              label="Select status"
              onChange={(value) => handleFilterChange(value)}
            >
              <Option value="all">All Vendors</Option>
              <Option value="pending">Pending Vendors</Option>
              <Option value="approved">Approved Vendors</Option>
            </Select>
          </div>

          {/* Button Group for larger screens */}
          <div className="hidden sm:flex gap-4">
            <ButtonGroup variant="outlined" color="amber" size="sm">
              <Button
                onClick={() => handleFilterChange("all")}
                className={
                  filterStatus === "all" ? "bg-[#F8B34B] text-white" : ""
                }
              >
                All Vendors
              </Button>
              <Button
                onClick={() => handleFilterChange("pending")}
                className={
                  filterStatus === "pending" ? "bg-[#F8B34B] text-white" : ""
                }
              >
                Pending Customers
              </Button>
              <Button
                onClick={() => handleFilterChange("approved")}
                className={
                  filterStatus === "approved" ? "bg-[#F8B34B] text-white " : ""
                }
              >
                Approved Customers
              </Button>
            </ButtonGroup>
          </div>
        </div>

        {/* VENDOR TABLE SECTION */}
        <section>
          <Typography variant="h4" className="mb-5">
            List of Customers
          </Typography>
          {loading ? (
            <div className="animate-pulse">
              <div className="w-full h-12 bg-gray-300 mb-3 rounded-md"></div>
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 items-center justify-evenly py-3 border-b border-gray-200"
                >
                  <div className="h-5 w-32 bg-gray-300 rounded-full"></div>
                  <div className="h-5 w-32 bg-gray-300 rounded-full"></div>
                  <div className="h-5 w-32 bg-gray-300 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <CustomersTable customers={filteredCustomers} />
          )}
        </section>
      </main>
    </>
  );
};

export default Admincustomers;
