import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Curtains from "@/pages/Curtains";
import Blinds from "@/pages/Blinds";
import Contact from "@/pages/Contact";
import GetAQuote from "@/pages/GetAQuote";
import RefundPolicy from "@/pages/RefundPolicy";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/curtains" element={<Curtains />} />
          <Route path="/blinds" element={<Blinds />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-a-quote" element={<GetAQuote />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
