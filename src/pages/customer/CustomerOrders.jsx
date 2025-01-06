import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  ButtonGroup,
  Select,
  Option,
} from "@material-tailwind/react";
import CustomerSideBar from "../../components/CustomerSideBar";
import CustomerOrdersTable from "../../components/customer/CustomerOrdersTable";
import { useAuth } from "../../context/authContext";
import buzzar_api from "../../config/api-config";
import Header from "../../components/Header";

const CustomerOrders = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const { user } = useAuth();
  const [ordersList, setOrdersList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders for the user
        const ordersResponse = await buzzar_api.get(`/orders/user/${user.id}`);
        const orders = ordersResponse.data;

        // Fetch all products data from localStorage and parse it
        const productsResponse = localStorage.getItem("allProducts");
        const products = productsResponse ? JSON.parse(productsResponse) : [];

        // Map the product names to each order's items
        const updatedOrders = orders.map((order) => {
          const updatedItems = order.items.map((item) => {
            const product = products.find(
              (product) => product.id === item.product
            );
            if (product) {
              item.product_name = product.product_name; // Add product name to the item
            }
            return item;
          });
          return { ...order, items: updatedItems };
        });

        setOrdersList(updatedOrders);
        console.log(updatedOrders); // Logs the updated orders with product names
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, [user.id]);
  // Run when the user ID or products change

  // Array of order statuses
  const statuses = ["All", "PENDING", "CONFIRMED", "DELIVERED"];

  // Filter orders based on the selected status
  const filteredOrders = ordersList.filter(
    (order) => statusFilter === "All" || order.order_status === statusFilter
  );

  // Handle status filter change
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col lg:flex-row min-h-screen">
        <CustomerSideBar />
        <section className="flex flex-col w-full p-6 md:p-10">
          <header>
            <Typography variant="h1">Orders</Typography>
            <Typography variant="paragraph">Welcome to your Orders</Typography>
          </header>

          <div className="mt-10 space-y-5">
            {/* Button Group for larger screens */}
            <div className="hidden sm:block">
              <ButtonGroup variant="outlined" fullWidth color="amber" size="md">
                {statuses.map((status) => (
                  <Button
                    key={status}
                    onClick={() => handleStatusFilter(status)}
                    className={
                      statusFilter === status ? "bg-[#F8B34B] text-white" : ""
                    }
                  >
                    {status}
                  </Button>
                ))}
              </ButtonGroup>
            </div>

            {/* Select dropdown for smaller screens */}
            <div className="block sm:hidden">
              <Select
                label="Select Status"
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
              >
                {statuses.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </div>

            <CustomerOrdersTable orders={filteredOrders} />
          </div>
        </section>
      </main>
    </>
  );
};

export default CustomerOrders;
