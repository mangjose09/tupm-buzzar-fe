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
    <section className="grid grid-cols-3 gap-4 h-[400px]">
      {/* Carousel (left column) */}
      <div className="col-span-2">
        <Carousel className="h-full rounded-xl">
          {/* Slide 1 */}
          <div className="relative h-full w-full">
            <img
              src={IMG}
              alt="Product 1"
              className="h-full w-full object-cover"
            />
          </div>

          {/* You can uncomment the slides if you need more */}
          {/* <div className="relative h-full w-full">
            <img
              src="https://via.placeholder.com/1600x500?text=Product+2"
              alt="Product 2"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative h-full w-full">
            <img
              src="https://via.placeholder.com/1600x500?text=Product+3"
              alt="Product 3"
              className="h-full w-full object-cover"
            />
          </div> */}
        </Carousel>
      </div>

      {/* Latest Products (right column) */}
      <div className="col-span-1 flex flex-col justify-center gap-4 h-full">
        <Typography variant="h4" className="text-gray-900 mb-4">
          Latest Products
        </Typography>

        {/* List of 2 products */}
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            {/* Product Image */}
            <img
              src={product.img}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
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

        {/* Optionally, add a "View All" button */}
        <Button size="lg" className="mt-4 bg-[#F6962E]">
          View All Products
        </Button>
      </div>
    </section>
  );
};

export default Hero;
