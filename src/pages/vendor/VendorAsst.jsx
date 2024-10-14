import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

const VendorAsst = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen px-6 py-5 md:px-24 md:py-10 space-y-10">
        <header className="w-full text-center">
          <Typography variant="h2">Vendor Assistance</Typography>
          <Typography variant="lead">
            Know more about being a vendor.
          </Typography>
        </header>
        <section>
          <Typography variant="h5" className="flex items-center">
            <BuildingStorefrontIcon className="w-8 h-8  mr-2 text-[#F8B34B]" />
            How to be a vendor?
          </Typography>
          <article className="mt-4 flex flex-col md:flex-row flex-start gap-x-3">
            <div className="md:w-2/3">
              <Typography variant="paragraph" className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                efficitur justo vel erat rhoncus, vitae tincidunt orci accumsan.
                Aliquam congue finibus gravida. Fusce a euismod ipsum, id
                aliquet sem. Nulla vehicula, felis id ornare elementum, justo
                felis maximus nisl, in porta turpis nisl sed mauris. Sed odio
                erat, imperdiet eu.
              </Typography>
              <Typography variant="paragraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                efficitur justo vel erat rhoncus, vitae tincidunt orci accumsan.
                Aliquam congue finibus gravida. Fusce a euismod ipsum, id
                aliquet sem. Nulla vehicula, felis id ornare elementum, justo
                felis maximus nisl, in porta turpis nisl sed mauris. Sed odio
                erat, imperdiet eu.
              </Typography>
            </div>
            <div className="md:w-1/3">
              <img
                src="https://placehold.co/600x400/png"
                alt="Vendor illustration"
                className="hidden md:inline-block rounded-lg shadow-md h-auto w-auto object-cover"
              ></img>
            </div>
          </article>
        </section>
        <section className="flex flex-col place-items-center">
          <Typography variant="paragraph">
            Interested in becoming a vendor?
          </Typography>
          <Link
            to="/vendor/register"
            state={{ headerTitle: "Vendor Registration" }}
          >
            <Button size="md" className="bg-[#F8B34B]">
              Register to be a vendor
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default VendorAsst;
