import React from "react";
import { Link } from "react-router-dom";
import LegalPage from "../components/LegalPage";
import { BUSINESS } from "../lib/constants";

const Terms = () => {
  const sections = [
    { heading: "About These Terms", body: [`These Terms & Conditions apply to your use of the ND Curtains website and to quotes, orders and services provided by ND Curtains. By requesting a quote or placing an order, you agree to these terms. Contact us at ${BUSINESS.email} or ${BUSINESS.phone}.`] },
    { heading: "Quotes", body: ["Quotes are provided free of charge and are based on the information and measurements available at the time. Final pricing may be confirmed after an in-home measure. Quotes are valid for a reasonable period and may be updated if your requirements or supplier pricing change."] },
    { heading: "Orders & Deposits", body: ["A 50% deposit is required to confirm a custom-made order, with the remaining balance due at installation. Orders are made to measure based on the specifications agreed with you."] },
    { heading: "Made-to-Measure Products", body: ["Our curtains and blinds are custom-made to your windows and chosen fabrics. Please review measurements, fabrics, colours and styles carefully before manufacturing begins. Cancellations and changes are covered by our Refund & Cancellation Policy."] },
    { heading: "Installation", body: ["Where installation is included, we will arrange a suitable time to install your products. Please ensure safe and clear access to the installation areas."] },
    { heading: "Product Variations", body: ["Fabric colours and textures may vary slightly from samples or on-screen images due to natural materials, dye lots and screen settings. Such minor variations are normal and not considered a fault."] },
    { heading: "Faults & Consumer Guarantees", body: ["If a product is faulty or not as described, you are entitled to a remedy under the Australian Consumer Law. See our Refund & Cancellation Policy for details."] },
    { heading: "Liability", body: ["To the extent permitted by law, ND Curtains is not liable for indirect or consequential loss. Nothing in these terms excludes, restricts or modifies any consumer guarantee or right you have under the Australian Consumer Law."] },
    { heading: "Website Content", body: ["Website content, including the ND Curtains name, logo and imagery, is provided for information only and may not be copied without permission. We aim to keep information accurate but do not warrant it is always complete or current."] },
    { heading: "Governing Law", body: ["These terms are governed by the laws of Victoria, Australia."] },
  ];

  return (
    <LegalPage
      seoTitle="Terms & Conditions"
      seoDescription="ND Curtains terms and conditions covering quotes, custom-made orders, deposits, installation and your rights under Australian Consumer Law."
      path="/terms"
      overline="The details"
      title="Terms & Conditions"
      draft
      intro="These Terms & Conditions govern quotes, orders and services from ND Curtains. This is a general document and not legal advice; please review it before it is finalised."
      sections={sections}
      footerNote={<>See also our <Link to="/refund-policy" className="text-gold hover:underline">Refund & Cancellation Policy</Link>.</>}
    />
  );
};

export default Terms;
