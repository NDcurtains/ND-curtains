import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "./ui/sonner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -80 });
        }
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default Layout;
