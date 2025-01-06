import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Fade, Slide } from "react-awesome-reveal";
const Hero = () => {
  return (
    <>
      <Fade>
        <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-center text-white">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="flex flex-col items-center md:items-start max-w-3xl mx-auto md:mx-0">
              <Slide>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left text-[#F6962E]">
                  Welcome to Buzzar
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-center md:text-left text-black">
                  Your One-Stop-Shop for All your Campus Needs
                </p>
                <div className="space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center justify-center md:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="w-full md:w-auto bg-[#F6962E]"
                  >
                    <Link to="shop">Shop Now</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto bg-black  "
                  >
                    <Link to="/about-us">Learn More</Link>
                  </Button>
                </div>
              </Slide>
            </div>
          </div>
        </section>
      </Fade>
    </>
  );
};

export default Hero;
