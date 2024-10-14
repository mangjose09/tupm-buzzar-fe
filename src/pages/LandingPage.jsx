import Hero from "../components/landing-page/Hero";
import Header from "../components/Header";
import FeaturedStores from "./../components/landing-page/FeaturedStores";

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="px-24 py-10 space-y-4">
        <Hero />
        <FeaturedStores />
      </div>
    </>
  );
}
