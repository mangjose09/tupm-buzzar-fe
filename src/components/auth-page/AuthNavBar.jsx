import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";

const AuthNavBar = () => {
  const location = useLocation();
  const headerTitle = location.state?.headerTitle || "Login";

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex flex-row justify-center items-center">
          <Link to="/">
            <Typography
              as="a"
              href="#"
              className="w-full mr-4 cursor-pointer py-1.5  text-lg md:text-2xl font-bold text-[#F8B34B]"
            >
              Buzzar
            </Typography>
          </Link>
          <Typography
            variant="h5"
            className="text-black  py-1.5 text-base md:text-lg"
          >
            {headerTitle}
          </Typography>
        </div>

        <Button variant="text" size="sm" className="">
          <span>Need Help?</span>
        </Button>
      </div>
    </Navbar>
  );
};

export default AuthNavBar;
