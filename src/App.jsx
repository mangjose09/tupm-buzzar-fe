import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
      </Routes>
    </BrowserRouter>
  );
}
