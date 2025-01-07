import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import buzzar_api from "../config/api-config";
import { Button } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
const VendorPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use this if you're using React Router
  const query = new URLSearchParams(location.search);
  const vendorId = query.get("id");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const allVendors = JSON.parse(localStorage.getItem("vendorData") || "[]");

  if (!vendorId) {
    navigate("/"); // Redirect to the home page
    return null; // Prevent further rendering
  }

  // Ensure vendor_id and vendorId have the same type for comparison (string or number)
  const vendorData = allVendors.find((v) => v.vendor_id == vendorId);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await buzzar_api.get(
          `/products/customer/vendor/${vendorId}/`
        );
        setProducts(response.data);
        console.log("Products:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const ProductSkeleton = () => (
    <div className="rounded-lg border bg-gray-200 animate-pulse shadow-sm flex flex-col">
      <div className="aspect-square bg-gray-300 rounded-t-lg"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {/* Vendor Header */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={vendorData.store_logo}
            alt={vendorData.store_name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-semibold">{vendorData.store_name}</h1>
          </div>
        </div>

        {/* Products Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
          ) : products.length > 0 ? (
            products.map((product, i) => (
              <div
                key={i}
                className="rounded-lg border bg-white hover:shadow-lg hover:border-2 hover:border-[#F6962E] text-card-foreground shadow-sm flex flex-col"
              >
                <div className="aspect-square relative">
                  <img
                    src={
                      product.product_images.length > 0
                        ? product.product_images[0].image_upload
                        : "/placeholder.jpg"
                    }
                    alt={product.product_name}
                    className="object-cover w-full h-full aspect-square rounded-t-lg"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg mb-2 text-center">
                    {product.product_name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 truncate text-center">
                    {product.product_description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold">
                      ₱{parseFloat(product.price).toFixed(2)}
                    </span>
                    <Button
                      onClick={() => navigate(`/product?id=${product.id}`)}
                      className="bg-[#F6962E] text-white"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VendorPage;
