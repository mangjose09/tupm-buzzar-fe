import { useReducer, useEffect, useState } from "react";
import { CreditCard, Truck, Loader2 } from "lucide-react";
import { useAuth } from "../../context/authContext";
import Header from "../../components/Header";
import { Button } from "@material-tailwind/react";
import buzzar_api from "../../config/api-config";
import CustomerCheckoutSuccess from "../../components/customer/CustomerCheckoutSuccess";
import PaymentProofPage from "./PaymentProofPage";

// Initial state for the reducer
const initialState = {
  isSubmitting: false,
  success: false,
  paymentMethod: "CASH ON DELIVERY",
  processing: false,
  orderDetails: null,
  specificOrderDetails: null,
};

// Reducer function for state management
// function checkoutReducer(state, action) {
//   switch (action.type) {
//     case "SET_ORDER_DETAILS":
//       return {
//         ...state,
//         orderDetails: action.payload.orderDetails,
//         specificOrderDetails: action.payload.specificOrderDetails,
//       };
//     case "SET_PAYMENT_METHOD":
//       return { ...state, paymentMethod: action.payload };
//     case "SET_IS_SUBMITTING":
//       return { ...state, isSubmitting: action.payload };
//     case "SET_SUCCESS":
//       return { ...state, success: action.payload };
//     case "SET_PROCESSING":
//       return { ...state, processing: action.payload };
//     default:
//       return state;
//   }
// }

export default function CustomerCheckout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [processing, setProcessing] = useState(false);
  const [submitProof, setSubmitProof] = useState(false);
  const { user } = useAuth();

  const [orderDetails, setOrderDetails] = useState(null);
  const [specificOrderDetails, setSpecificOrderDetails] = useState(null);

  useEffect(() => {
    const storedOrderDetails = localStorage.getItem("orderDetails");
    const storedSpecificOrderDetails = localStorage.getItem(
      "specificOrderDetails"
    );

    if (storedOrderDetails) {
      setOrderDetails(JSON.parse(storedOrderDetails));
    }
    if (storedSpecificOrderDetails) {
      setSpecificOrderDetails(JSON.parse(storedSpecificOrderDetails));
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add payment method to the order details
    const updatedOrderDetails = {
      ...orderDetails,
      payment_method: paymentMethod,
    };

    try {
      if (paymentMethod === "GCASH") {
        setProcessing(true);
        setTimeout(() => {
          setProcessing(false);
          setSubmitProof(true);
        }, 2000);
      } else {
        const response = await buzzar_api.post("/orders/", updatedOrderDetails);
        console.log("Order placed successfully:", response.data);

        setProcessing(false);
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
      setProcessing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!orderDetails || !specificOrderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Loader View */}
        {processing && (
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Processing Your Order
            </h1>
            <p className="text-gray-600">
              Please wait while we confirm your purchase...
            </p>
          </div>
        )}

        {/* Payment Proof Upload View */}
        {submitProof && <PaymentProofPage />}

        {/* Success View */}
        {!processing && !submitProof && success && <CustomerCheckoutSuccess />}

        {/* Checkout Form */}
        {!processing && !submitProof && !success && (
          <>
            <h1 className="text-3xl text-[#F6962E] font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Summary */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Product Summary</h2>
                {specificOrderDetails.order_items?.map((item, index) => (
                  <div className="flex items-center space-x-4 mb-4" key={index}>
                    <div>
                      <h3 className="font-medium">{item.product_name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">
                        Selected Variants: {item.selected_variants?.join(", ")}
                      </p>
                      <p className="text-gray-600">
                        Price: ₱{parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <hr className="my-4 border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">
                    ₱{orderDetails.total_amount}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              <div>
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Payment Method */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Payment Method
                    </h2>
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-gray-800">
                        Select Payment Method
                      </h2>
                      <div className="flex items-center gap-4">
                        {/* Cash Button */}
                        <Button
                          variant="outline"
                          onClick={() => setPaymentMethod("COD")}
                          className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm border transition-all ${
                            paymentMethod === "CASH ON DELIVERY"
                              ? "bg-gray-200 text-black border-[#F6962E]"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          Cash
                        </Button>

                        {/* GCash Button */}
                        <Button
                          variant="outline"
                          onClick={() => setPaymentMethod("GCASH")}
                          className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm border transition-all flex items-center justify-center gap-2 ${
                            paymentMethod === "GCASH"
                              ? "bg-gray-200 text-black border-[#F6962E]"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          <img
                            src="/GCash_logo.svg.png"
                            alt="GCash"
                            className="h-5 w-auto"
                            aria-hidden="true"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full bg-[#F6962E] text-white py-2 px-4 rounded-md font-medium flex items-center justify-center ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:[#f6b979]"
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Truck className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Place Order
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
