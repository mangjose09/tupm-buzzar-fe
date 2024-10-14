import React, { useState } from "react";
import AuthNavBar from "../components/auth-page/AuthNavBar";
import Footer from "../components/Footer";
import BrandImage from "../components/auth-page/BrandImage";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import buzzar_api from "../config/api-config";

const CustomerLogin = () => {
  const [loading, setLoading] = useState(false); // State to manage loading

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onBlur", // Trigger validation on blur
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data) => {
    setLoading(true); // Set loading to true
    try {
      const response = await buzzar_api.post("/login/", data); // Replace with your actual login endpoint
      console.log("Login successful:", response.data);
      // Handle successful login, e.g., redirect or show a success message
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        const apiError = error.response.data.detail;
        alert(`There's an error on the following: ${apiError}`);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
      // Handle error, e.g., show an error message
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  return (
    <>
      <AuthNavBar />
      <section className="min-h-screen px-6 py-5 md:px-24 md:py-10 grid grid-cols-1 lg:grid-cols-2 gap-x-4">
        <BrandImage />
        <article className="flex p-0 md:px-20 md:items-center">
          <Card className="w-full border outline outline-[#F8B34B] outline-1">
            <CardHeader
              variant="gradient"
              floated={false}
              className="mb-4 grid h-auto place-items-center shadow-none rounded-none"
            >
              <Typography variant="h3">Log In</Typography>
            </CardHeader>
            <form onSubmit={handleSubmit(onLoginSubmit)}>
              <CardBody className="flex flex-col gap-4">
                <div>
                  <Input
                    type="email"
                    label="Email"
                    placeholder="email@example.com"
                    {...register("email", {
                      required: "Email is required",
                      // validate: validateEmail,
                    })}
                    onBlur={() => trigger("email")} // Trigger validation onBlur
                    error={errors.email}
                  />
                  {errors.email && (
                    <Typography color="red" variant="small">
                      {errors.email.message}
                    </Typography>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    label="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                      // validate: validateEmail,
                    })}
                    onBlur={() => trigger("password")} // Trigger validation onBlur
                    error={errors.password}
                  />
                  {errors.password && (
                    <Typography color="red" variant="small">
                      {errors.password.message}
                    </Typography>
                  )}
                </div>

                <div className="-ml-2.5">
                  <Checkbox label="Remember Me" />
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  fullWidth
                  className="bg-[#F8B34B] flex items-center justify-center"
                  type="submit"
                  loading={loading}
                >
                  Log In
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Don&apos;t have an account?
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold"
                  >
                    <Link
                      to="/customer/register"
                      state={{ headerTitle: "Customer Registration" }}
                    >
                      Register
                    </Link>
                  </Typography>
                </Typography>
              </CardFooter>
            </form>
          </Card>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default CustomerLogin;
