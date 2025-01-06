import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import buzzar_api from "../../config/api-config";
import { useNavigate } from "react-router-dom";

const LandingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await buzzar_api.get("/products/list"); // Assuming the endpoint is "/products"
        const allProducts = response.data; // Adjust according to your API's response
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
        // Shuffle the products and select 10 random ones
        const shuffledProducts = shuffleArray(allProducts);
        const randomProducts = shuffledProducts.slice(0, 12);
        setProducts(randomProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchProducts();
  }, []);

  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Skeleton loader component
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
    <section className="w-full py-4 md:py-8 lg:py-10 flex justify-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
          Featured Products
        </h2>
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
    </section>
  );
};

export default LandingProducts;
