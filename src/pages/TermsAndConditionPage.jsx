import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typography } from "@material-tailwind/react";

const TermsAndConditionPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen px-6 py-5 md:px-24 md:py-10 space-y-10">
        <header className="w-full text-center">
          <Typography variant="h2">Terms and Conditions</Typography>
        </header>
        <section>
          <Typography variant="h4">1. Introduction</Typography>
          <Typography variant="paragraph">
            Welcome to Buzzar. These Terms and Conditions govern your use of our
            website and the purchase of products from our online store. By
            accessing our website or placing an order, you agree to be bound by
            these Terms and Conditions.
          </Typography>
        </section>

        <section>
          <Typography variant="h4"> 2. Definitions</Typography>
          <Typography variant="paragraph" className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            quis enim molestie, egestas augue nec, elementum tortor. Duis
            posuere ante ac purus imperdiet, sit amet gravida eros ornare. Nam
            euismod enim dui, ac pellentesque sem iaculis nec. Aliquam erat
            volutpat. Aenean cursus erat quam, ac interdum libero hendrerit nec.
            Morbi.
          </Typography>
        </section>

        <section>
          <Typography variant="h4"> 3. Products</Typography>
          <Typography variant="paragraph" className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            quis enim molestie, egestas augue nec, elementum tortor. Duis
            posuere ante ac purus imperdiet, sit amet gravida eros ornare. Nam
            euismod enim dui, ac pellentesque sem iaculis nec. Aliquam erat
            volutpat. Aenean cursus erat quam, ac interdum libero hendrerit nec.
            Morbi.
          </Typography>
        </section>

        <section>
          <Typography variant="h4"> 4. Ordering and Payment</Typography>
          <Typography variant="paragraph" className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            quis enim molestie, egestas augue nec, elementum tortor. Duis
            posuere ante ac purus imperdiet, sit amet gravida eros ornare. Nam
            euismod enim dui, ac pellentesque sem iaculis nec. Aliquam erat
            volutpat. Aenean cursus erat quam, ac interdum libero hendrerit nec.
            Morbi.
          </Typography>
        </section>

        <section>
          <Typography variant="h4">
            5. Changes to Terms and Conditions
          </Typography>
          <Typography variant="paragraph" className="mb-4">
            We reserve the right to modify these Terms and Conditions at any
            time. Changes will be effective immediately upon posting to the
            website. Your continued use of the website after any changes
            indicates your acceptance of the new Terms and Conditions.
          </Typography>
        </section>
        <section>
          <Typography variant="h4">6. Contact Us </Typography>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <address className="not-italic">
            <Typography variant="paragraph">
              San Marcelino St, Ayala Blvd, Ermita, Manila, 1000, Philippines
            </Typography>
            <Typography as="a" href="mailto:info@buzzar.com" className="">
              Email:{" "}
              <span className="text-blue-gray-400 hover:underline hover:text-black transition-all duration-300">
                info@buzzar.com
              </span>
            </Typography>
            <Typography as="a" href="tel:+1234567890" variant="paragraph">
              Call us:{" "}
              <span className="text-blue-gray-400 hover:underline hover:text-black transition-all duration-300">
                +123 456 7890
              </span>
            </Typography>
          </address>
        </section>

        <Typography variant="small" color="blue-gray" className="mt-8">
          Last updated: October 08, 2024
        </Typography>
      </main>
      <Footer />
    </>
  );
};

export default TermsAndConditionPage;
