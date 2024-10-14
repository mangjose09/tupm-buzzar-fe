import React from "react";
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

const CustomerLogin = () => {
  return (
    <>
      <AuthNavBar />
      <section className="min-h-[80dvh] px-24 py-10 grid grid-cols-2 gap-x-4">
        <BrandImage />
        <article className="flex px-20 items-center">
          <Card className="w-full border outline outline-[#F8B34B] outline-1">
            <CardHeader
              variant="gradient"
              floated={false}
              className="mb-4 grid h-auto place-items-center shadow-none rounded-none"
            >
              <Typography variant="h3">Log In</Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="email"
                label="Email"
                placeholder="email@example.com"
              />
              <Input type="password" label="Password" />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button fullWidth className="bg-[#F8B34B]">
                Log In
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="text"
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
          </Card>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default CustomerLogin;
