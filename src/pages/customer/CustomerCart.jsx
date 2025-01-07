import React, { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import CustomerSideBar from "../../components/CustomerSideBar";
import buzzar_api from "../../config/api-config";
import Header from "../../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  // console.log(allProducts);

  useEffect(() => {
    // Fetch the cart items
    const fetchCartItems = async () => {
      try {
        const response = await buzzar_api.get("/carts");
        setCartItems(response.data); // Store cart items in state
        console.log("Cart Items: ", response.data);
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      }
    };

    // Fetch all products from localStorage
    const storedProducts = localStorage.getItem("allProducts");
    if (storedProducts) {
      setAllProducts(JSON.parse(storedProducts)); // Store parsed products in state
    }

    fetchCartItems();
  }, []);

  // Compute matchedCartItems only after cartItems and allProducts are available
  const matchedCartItems = cartItems.map((cartItem) => {
    const matchedProduct = allProducts.find(
      (product) => product.id === cartItem.product
    );
    return {
      ...cartItem,
      product_name: matchedProduct
        ? matchedProduct.product_name
        : "Unknown Product",
    };
  });

  console.log("Matched Cart Items: ", matchedCartItems);

  // const calculateTotal = () => {
  //   return cartItems
  //     .reduce((acc, item) => acc + item.price * item.quantity, 0)
  //     .toFixed(2);
  // };

  const handleRowClick = (productId) => {
    navigate(`/product?id=${productId}`); // Navigate to product details page
  };

  return (
    <>
      <Header />
      <main className="flex flex-col lg:flex-row min-h-screen">
        <CustomerSideBar />
        <section className="flex flex-col w-full p-6 md:p-10">
          <header>
            <Typography variant="h1">Cart</Typography>
            <Typography variant="paragraph">Review your cart items</Typography>
          </header>

          <div className="mt-10 space-y-5">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matchedCartItems.length > 0 ? (
                    matchedCartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRowClick(item.product)}
                      >
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">
                          {item.product_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">
                          ₱{item.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">
                          {item.vendor.store_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b">
                          ₱{item.price}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-sm text-gray-500 border-b"
                      >
                        Your cart is empty.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* {cartItems.length > 0 && (
              <div className="flex justify-between mt-5">
                <Typography variant="h6">Total: ₱{calculateTotal()}</Typography>
                <Button color="amber" size="md">
                  Proceed to Checkout
                </Button>
              </div>
            )} */}
          </div>
        </section>
      </main>
    </>
  );
};

export default CustomerCart;
