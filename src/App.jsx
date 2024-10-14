import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerRegister from "./pages/customer/CustomerRegister";
import VendorLogin from "./pages/vendor/VendorLogin";
import VendorRegister from "./pages/vendor/VendorRegister";
import AboutUsPage from "./pages/AboutUsPage";
import FAQPage from "./pages/FAQPage";
import VendorAsst from "./pages/vendor/VendorAsst";
import CustomerAsst from "./pages/customer/CustomerAsst";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionPage from "./pages/TermsAndConditionPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/vendor-assistance" element={<VendorAsst />} />
        <Route path="/customer-assistance" element={<CustomerAsst />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditionPage />}
        />

        {/* Customer Paths */}
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />

        {/* Vendor Paths */}
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
      </Routes>
    </BrowserRouter>
  );
}
