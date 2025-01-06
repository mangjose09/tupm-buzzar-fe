import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import buzzar_api from "../config/api-config";
import CustomerLayout from "../components/customer/CustomerLayout";
import ProductImageGallery from "../components/customer/ProductImageGallery";
import {
  Button,
  Select,
  Option,
  Typography,
  Input,
  Card,
  CardBody,
  Rating,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  CardFooter,
} from "@material-tailwind/react";
import {
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  HeartIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import IMG from "/ESPORTS_JERSEYS.png";
import IMG2 from "/pastil.jpg";
import IMG3 from "/SHESH.png";

const ProductPage = () => {
  // const [mainImage, setMainImage] = useState(IMG);
  const query = new URLSearchParams(location.search);
  const productId = query.get("id");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [postRating, setPostRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviews, setReviews] = useState([]);
  const [vendorData, setVendorData] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const ProductPageSkeleton = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background ">
        <div className="animate-bounce">
          <img src="/BUZZAR_BRAND_LOGO.png" alt="" className="h-20 w-20" />
        </div>
        <p className="mt-4 text-xl font-medium text-muted-foreground">
          Loading product...
        </p>
      </div>
    );
  };

  const toggleSelection = (variantType, optionId, variantPrice) => {
    if (variantPrice != null) {
      setProductPrice(variantPrice);
    } else {
      setProductPrice(product.price);
    }

    setSelectedOptions((prev) => {
      // Find the current variant and its options
      const variant = product.variants.find(
        (v) => v.variant_type === variantType
      );
      if (!variant) return prev;

      // Check if the selected option is already chosen
      const isOptionSelected = prev.includes(optionId);

      // Remove the current variant's previously selected option, if any
      const filteredOptions = prev.filter(
        (id) => !variant.options.some((option) => option.id === id)
      );

      // Add the newly selected option if it wasn't already selected
      return isOptionSelected
        ? filteredOptions
        : [...filteredOptions, optionId];
    });
  };

  function formatDate(isoString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", options);
  }

  const handleQuantityChange = (newQuantity) => {
    const updatedQuantity = Math.max(1, Math.min(newQuantity, stock));
    setQuantity(updatedQuantity);
    console.log("Selected quantity:", updatedQuantity);
  };

  const addToCart = () => {
    // Logic to add the product to the cart goes here

    toast.success("Added to cart", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      progressStyle: { backgroundColor: "#F6962E" },
      theme: "light",
    });
  };

  // const navigateToVendor = () => {
  //   if (vendorData) {
  //     navigate(`/vendor/${vendorData.id}`);
  //   }
  // };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Introduce a delay
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay

        const response = await buzzar_api.get(`/product/${productId}`);
        setProduct(response.data);
        setLoading(false);
        setStock(response.data.stock_qty);
        setProductPrice(response.data.price);
        setProductImages(response.data.product_images);
        console.log("Product Data:", response.data);

        // Fetch vendor data
        if (response.data.vendor) {
          const getVendorData = async () => {
            try {
              const vendorResponse = await buzzar_api.get(
                `/vendors/${response.data.vendor}`
              );
              setVendorData(vendorResponse.data);
              console.log("Vendor Data:", vendorResponse.data);
            } catch (error) {
              console.error("Error fetching vendor data:", error);
            }
          };

          getVendorData();
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const getReviews = async () => {
    try {
      const response = await buzzar_api.get(`/products/${productId}/reviews/`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  {
    /* Similar Products */
  }
  useEffect(() => {
    if (product && product.categories && product.categories.length > 0) {
      // Parse productList if it's a string
      const productList = JSON.parse(
        localStorage.getItem("allProducts") || "[]"
      );

      if (Array.isArray(productList)) {
        const productCat = product.categories.map((cat) => cat.category_name);

        const filteredProducts = productList.filter((prod) =>
          prod.categories.some((cat) => productCat.includes(cat.category_name))
        );

        setSimilarProducts(filteredProducts.slice(0, 8));
        console.log("Similar Products:", filteredProducts);
      }
    } else {
      setSimilarProducts([]); // Clear similar products if conditions are not met
    }
  }, [product]);

  useEffect(() => {
    // Call getReviews when the component mounts
    getReviews();
  }, []);
  // const postReview = async () => {
  //   // Validate the rating before proceeding
  //   if (postRating <= 0) {
  //     alert("Please provide a rating greater than zero."); // You can replace this with your preferred UI feedback
  //     return; // Exit the function if validation fails
  //   }

  //   try {
  //     const response = await buzzar_api.post(
  //       `/products/${productId}/reviews/`,
  //       {
  //         product: productId,
  //         rating: postRating,
  //         review_text: reviewContent,
  //       }
  //     );
  //     console.log("Review posted:", response.data);
  //     setReviews([response.data, ...reviews]);
  //     setReviewContent("");
  //     setPostRating(0);
  //     // Handle the response, e.g., show a success message
  //   } catch (error) {
  //     console.error("Error posting review:", error);
  //     // Handle the error, e.g., show an error message
  //   }
  // };

  const handleCheckout = () => {
    // Check if the product has variants
    if (product.variants && product.variants.length > 0) {
      // Ensure all variants are selected
      const allVariantsSelected = product.variants.every((variant) =>
        selectedOptions.some((optionId) =>
          variant.options.some((option) => option.id === optionId)
        )
      );

      if (!allVariantsSelected) {
        alert("Please select all variants before proceeding.");
        return; // Exit the function if validation fails
      }
    }

    const priceAsNumber = parseFloat(productPrice); // Convert price to number
    const totalAmount = (priceAsNumber * quantity).toFixed(2); // Calculate total and format

    // Main order details for checkout
    const orderDetails = {
      total_amount: totalAmount,
      order_items: [
        {
          product: product.id, // Reference to the product ID
          quantity: quantity,
          price: priceAsNumber.toFixed(2), // Convert back to string for storage
          selected_variant: selectedOptions, // Array of selected variant IDs
        },
      ],
    };

    // Extract selected variant names
    const selectedVariantDetails = selectedOptions.map((optionId) => {
      // Search for the variant and its options
      const variant = product.variants.find((v) =>
        v.options.some((o) => o.id === optionId)
      );
      const option = variant
        ? variant.options.find((o) => o.id === optionId)
        : null;
      return option ? option.name : null; // Return the name if found
    });

    // Separate product details for additional information
    const specificOrderDetails = {
      total_amount: totalAmount,
      order_items: [
        {
          product_name: product.product_name, // Assuming `product.name` exists
          product_id: product.id,
          price: productPrice,
          quantity: quantity,
          selected_variants: selectedVariantDetails,
        },
      ], // Store variant names
    };

    // Store in localStorage or sessionStorage
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    localStorage.setItem(
      "specificOrderDetails",
      JSON.stringify(specificOrderDetails)
    );

    // Navigate to checkout page
    // user
    //   ? navigate("/customer/checkout")
    //   : navigate("/customer/login", {
    //       state: { headerTitle: "Customer Login" },
    //     });
    navigate("/customer/checkout");
  };

  // List of thumbnails
  // const productImages = ["/ESPORTS_JERSEYS.png", "/pastil.jpg", "/SHESH.png"];
  return (
    <CustomerLayout>
      <Header />
      {loading ? (
        <ProductPageSkeleton />
      ) : (
        <>
          <section className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row max-h-screen">
              <Card className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-6">
                  <ProductImageGallery images={productImages} />
                </div>
                <CardBody className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {product.product_name}
                    </h1>
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        <Rating
                          value={4}
                          readonly
                          // className="w-5 h-5 fill-primary text-primary"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        (125 reviews)
                      </span>
                    </div>
                    <div className="flex items-center mb-4 gap-2">
                      {product.categories.length > 0 &&
                        product.categories.map((category) => (
                          <div class="rounded-xl bg-slate-800 py-0.5 px-2.5 border border-black text-sm text-gray transition-all shadow-sm">
                            {category.category_name}
                          </div>
                        ))}
                    </div>
                    <div className="mb-6">
                      <p className="text-sm">
                        {stock > 0 ? (
                          <>
                            <span className="font-semibold text-green-600">
                              In Stock
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              - {stock} available
                            </span>
                          </>
                        ) : (
                          <span className="font-semibold text-red-600">
                            Out of Stock
                          </span>
                        )}
                      </p>
                    </div>
                    <p className="text-2xl font-bold mb-4">₱{productPrice}</p>
                    <p className="text-muted-foreground mb-6">
                      {product.product_description}
                    </p>

                    {product.variants.map((variant) => (
                      <div key={variant.id} className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">
                          {variant.variant_type}
                        </h2>
                        <div className="flex gap-4 flex-wrap">
                          {variant.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() =>
                                toggleSelection(
                                  variant.variant_type,
                                  option.id,
                                  option.variant_price
                                )
                              }
                              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                selectedOptions.includes(option.id)
                                  ? "bg-[#F6962E] text-white"
                                  : "bg-white text-black border border-[#F6962E] hover:bg-[#F6962E] hover:text-white"
                              }`}
                            >
                              {option.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">Quantity</h2>
                      <div className="flex gap-2 items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <input
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(parseInt(e.target.value, 10))
                          }
                          className="w-5 mx-2 text-center items-center justify-center text-lg"
                          min={1}
                          max={stock}
                          readOnly
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= stock}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="filled"
                      className="w-full flex items-center justify-center gap-3 bg-[#F6962E]"
                      onClick={handleCheckout}
                    >
                      <ShoppingCartIcon className="mr-2 h-4 w-4" />
                      Buy Now
                    </Button>
                    <Button
                      variant="outlined"
                      className="w-full flex items-center justify-center gap-3"
                      onClick={addToCart}
                    >
                      <HeartIcon className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </section>
          {/* Vendor Info Section */}

          <section className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-6 p-6 border border-gray-200 rounded-xl shadow-md bg-[#F6962E]">
              {/* Vendor Image */}
              <img
                src={vendorData?.store_logo || "/default-vendor.jpg"}
                alt={vendorData?.store_name || "Vendor Name"}
                className="w-24 h-24 rounded-full object-cover"
              />

              {/* Vendor Details */}
              <div className="flex-1">
                <h3 className="text-xl text-white font-semibold">
                  {vendorData?.store_name || "Vendor Name"}
                </h3>
              </div>

              {/* Visit Store Button */}
              <Button
                variant="filled"
                className=" flex items-center justify-center gap-3 bg-white text-[#F6962E]"
              >
                <BuildingStorefrontIcon className="mr-2 h-4 w-4" />
                Visit Store
              </Button>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <Card className="max-h-[500px]">
              <CardBody className="p-6 space-y-6 overflow-y-auto">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border border-black rounded-md"
                    >
                      <div className="p-6">
                        <div className="flex items-start">
                          {/* Uncomment and customize Avatar if needed */}
                          {/* <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={review.avatar} alt={review.author} />
                  <AvatarFallback>
                    {review.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar> */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              {/* <h3 className="font-semibold">{review.author}</h3> */}
                              <span className="text-sm text-muted-foreground">
                                {formatDate(review.created_at)}
                              </span>
                            </div>
                            <div className="flex items-center mt-1 mb-2">
                              <Rating
                                value={review.rating}
                                readonly
                                // className="w-5 h-5 fill-primary text-primary"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {review.review_text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No reviews available for this product.
                  </p>
                )}
              </CardBody>
              {/* <CardFooter>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">Rate this product:</span>
                    <Rating
                      value={postRating}
                      onChange={(value) => setPostRating(value)}
                    />
                  </div>
                  <div className="relative flex w-full">
                    <Input
                      type="text"
                      label="Write your review"
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      className="pr-20"
                      containerProps={{
                        className: "w-full",
                      }}
                    />
                    <Button
                      size="sm"
                      className="!absolute right-1 top-1 rounded"
                      onClick={postReview}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </CardFooter> */}
            </Card>
          </section>
          <section className="container mx-auto px-4 py-8">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
                Similar Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarProducts.length > 0 &&
                  similarProducts.map((product, i) => (
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
                            onClick={() =>
                              navigate(`/product?id=${product.id}`)
                            }
                            className="bg-[#F6962E] text-white"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />

      <Footer />
    </CustomerLayout>
  );
};

export default ProductPage;
