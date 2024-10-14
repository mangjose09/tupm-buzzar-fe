import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Input,
  Badge,
} from "@material-tailwind/react";
import { ShoppingCartIcon, Bars2Icon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <Navbar className="mx-auto max-w-full py-2 px-4 lg:px-8 lg:py-4 sticky top-0 z-10 rounded-none">
      <div className="flex justify-between items-center">
        {/* Left Section - Logo */}
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 text-2xl font-bold text-[#F8B34B]"
        >
          Buzzar
        </Typography>

        {/* Center Section - Search Bar */}
        <div className="hidden lg:flex flex-1 items-center mx-4">
          <Input
            type="text"
            placeholder="Search for products"
            className="pr-20 text-black"
            containerProps={{
              className: "min-w-[300px] text-black",
            }}
            labelProps={{
              className: "text-black",
            }}
          />
        </div>

        {/* Right Section - Navigation & Cart */}
        <div className="flex items-center space-x-4">
          <Typography
            as="a"
            href="#"
            className="hidden lg:inline-block text-black"
          >
            Home
          </Typography>
          <Typography
            as="a"
            href="#"
            className="hidden lg:inline-block text-black"
          >
            Shop
          </Typography>
          <Typography
            as="a"
            href="#"
            className="hidden lg:inline-block text-black"
          >
            About Us
          </Typography>
          <Typography
            as="a"
            href="#"
            className="hidden lg:inline-block text-black"
          >
            Contact
          </Typography>

          {/* Cart Icon with Badge */}

          <Badge content="3" overlap="circular" placement="top-end">
            <IconButton variant="text" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-[#F8B34B]" />
            </IconButton>
          </Badge>

          {/* Mobile Menu Icon */}
          <IconButton variant="text" className="lg:hidden">
            <Bars2Icon className="h-6 w-6 text-blue-500" />
          </IconButton>

          <Typography
            as="a"
            href="#"
            className="hidden lg:inline-block text-black"
          >
            Login / Register
          </Typography>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
