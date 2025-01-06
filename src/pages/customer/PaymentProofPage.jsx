"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
// import QRCode from "react-qr-code";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";

export default function PaymentProofPage() {
  const [file, setFile] = useState(null);

  // const onDrop = useCallback((acceptedFiles) => {
  //   setFile(acceptedFiles[0]);
  // }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleSubmit = () => {
    if (file) {
      // Here you would typically upload the file to your server
      console.log("Uploading file:", file.name);
      // Reset the file state after submission
      setFile(null);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>Payment Proof Upload</CardHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            {/* <QRCode value="https://example.com/payment" size={200} /> */}
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
                Drag and drop proof of payment here, or click to select file
              </p>
            )}
          </div>
        </div>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full" disabled={!file}>
            Submit Proof of Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
