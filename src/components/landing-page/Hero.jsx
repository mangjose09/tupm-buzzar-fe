import React from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import IMG from "/ESPORTS_JERSEYS.png";

const Hero = () => {
  // Dummy product data
  const products = [
    {
      id: 1,
      name: "GHX 2024 Official Jersey",
      price: "P899",
      img: "/SHESH.png",
    },
    {
      id: 2,
      name: "Kalbo's Chicken Pastil",
      price: "P59.99",
      img: "/pastil.jpg",
    },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[400px] p-4">
      {/* Carousel (left column on larger screens) */}
      <div className="lg:col-span-2">
        <Carousel className="h-[200px] lg:h-full rounded-xl">
          {/* Slide 1 */}
          <div className="relative h-full w-full">
            <img
              src={IMG}
              alt="Product 1"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Add more slides if needed */}
          {/* <div className="relative h-full w-full">
            <img
              src="https://via.placeholder.com/1600x500?text=Product+2"
              alt="Product 2"
              className="h-full w-full object-cover"
            />
          </div> */}
        </Carousel>
      </div>

      {/* Latest Products (right column on larger screens) */}
      <div className="flex flex-col justify-center gap-4 h-auto lg:h-full">
        <Typography variant="h4" className="text-gray-900 mb-4 text-center lg:text-left">
          Latest Products
        </Typography>

        {/* List of products */}
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            {/* Product Image */}
            <img
              src={product.img}
              alt={product.name}
              className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg"
            />
            {/* Product Details */}
            <div>
              <Typography variant="h6" className="text-gray-800">
                {product.name}
              </Typography>
              <Typography variant="paragraph" className="text-blue-gray-700">
                {product.price}
              </Typography>
            </div>
          </div>
        ))}

        {/* "View All" Button */}
        <Button size="lg" className="mt-4 bg-[#F6962E] w-full lg:w-auto mx-auto lg:mx-0">
          View All Products
        </Button>
      </div>
    </section>
  );
};

export default Hero;
