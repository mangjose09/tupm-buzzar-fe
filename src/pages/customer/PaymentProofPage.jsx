"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import buzzar_api from "../../config/api-config";
import { useAuth } from "../../context/authContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";
import CustomerCheckoutSuccess from "../../components/customer/CustomerCheckoutSuccess";
export default function PaymentProofPage({
  orderDetails,
  specificOrderDetails,
}) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const vendorData = JSON.parse(localStorage.getItem("checkoutVendor"));
  const ws = useRef(null);
  const { user, authTokens } = useAuth();

  useEffect(() => {
    if (!authTokens.access || !vendorData.user) return;

    const socketUrl = `ws://3.0.224.11/${user.id}/chat/${vendorData.user}/?token=${authTokens.access}`;
    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      console.log(
        "WebSocket connection established successfully with:",
        socketUrl
      );
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [authTokens.access, vendorData.user]);

  const createVendorMessage = (orderDetails, paymentMethod) => {
    // Format order items into a readable list
    const formattedItems = orderDetails.order_items
      .map(
        (item, index) =>
          `${index + 1}. ${item.product_name} (x${item.quantity}) `
      )
      .join("\n");

    // Construct the message
    const message = `Hello! I would like to place an order. Here are my details: Order Items: ${formattedItems}. Total Amount: PHP ${orderDetails.total_amount}. Payment Method: ${paymentMethod.payment_method}. Please let me know once my order is processed. Thank you!`;

    return message.trim();
  };

  if (!orderDetails || !specificOrderDetails) {
    return <div>Loading...</div>;
  }

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleSubmit = async () => {
    setIsProcessing(true);
    if (file) {
      try {
        // Step 1: Create the order
        const orderResponse = await buzzar_api.post("/orders/", orderDetails);
        const orderId = orderResponse.data.id; // Assuming the order ID is in the response's data field

        console.log("Order created successfully:", orderId);

        // Step 2: Prepare FormData for the payment proof
        const formData = new FormData();
        formData.append("orderitem", orderId); // Append the order ID
        formData.append("proof_of_payment", file); // Append the uploaded file

        // Step 3: Upload the payment proof
        const paymentResponse = await buzzar_api.post(
          "/orders/payment/",
          formData
        );

        console.log(
          "Payment proof uploaded successfully:",
          paymentResponse.data
        );

        handleSendMessage(
          createVendorMessage(specificOrderDetails, orderDetails)
        );

        // Reset the file state after submission
        setFile(null);
        setIsProcessing(false);

        // You can then show success or perform other actions as needed
        // alert("Order placed and payment proof uploaded successfully!");
      } catch (error) {
        console.error("Error processing the order:", error);
        alert(
          "Failed to place order or upload payment proof. Please try again."
        );
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleSendMessage = (message) => {
    ws.current.send(JSON.stringify({ message: message }));
  };

  return (
    <>
      {!isProcessing ? (
        <CustomerCheckoutSuccess />
      ) : (
        <div className="container mx-auto p-4">
          <Card className="w-full max-w-md mx-auto">
            <div className="items-center text-center text-2xl font-bold mb-4">
              Payment Proof Upload
            </div>
            <CardBody>
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <img src={vendorData.qr_code} alt="" />
                  <p className="text-xl">{vendorData.mobile_number}</p>
                  <p className="text-xl">{vendorData.store_name}</p>
                </div>
                <div
                  {...getRootProps()}
                  className={`p-4 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 hover:border-primary"
                  }`}
                >
                  <input {...getInputProps()} />
                  {file ? (
                    <p>File selected: {file.name}</p>
                  ) : isDragActive ? (
                    <p>Drop the file here ...</p>
                  ) : (
                    <p>
                      Drag and drop proof of payment here, or click to select
                      file
                    </p>
                  )}
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={!file}
              >
                Submit Proof of Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
