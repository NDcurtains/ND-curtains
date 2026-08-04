import React from "react";
import { Link } from "react-router-dom";
import LegalPage from "../components/LegalPage";
import { BUSINESS } from "../lib/constants";

const Privacy = () => {
  const sections = [
    { heading: "Who We Are", body: [`ND Curtains ("we", "us", "our") supplies and installs custom curtains and blinds, servicing Officer South and South East Melbourne. You can contact us at ${BUSINESS.email} or ${BUSINESS.phone}.`] },
    { heading: "Information We Collect", body: ["We collect the information you provide when you request a quote or contact us — such as your name, phone number, email, suburb/postcode, details about your windows, and any photos or messages you send. We may also collect basic technical data (such as pages visited) to help us improve the website."] },
    { heading: "How We Use Your Information", body: ["We use your information to respond to enquiries, prepare quotes, arrange in-home measures and installations, and communicate with you about your order. We do not sell your personal information."] },
    { heading: "Sharing Your Information", body: ["We may share limited information with trusted service providers who help us operate our business (for example, email delivery and fabric/blind suppliers) strictly to fulfil your request. We may disclose information where required by law."] },
    { heading: "Data Storage & Security", body: ["We take reasonable steps to protect your information from misuse, loss and unauthorised access. Enquiry details submitted through this website are delivered to us by email and may be stored in our business systems."] },
    { heading: "Cookies & Analytics", body: ["This website may use cookies and analytics tools to understand how visitors use the site. You can control cookies through your browser settings."] },
    { heading: "Access & Correction", body: ["You may request access to the personal information we hold about you, or ask us to correct it, by contacting us using the details above."] },
    { heading: "Your Rights", body: ["We handle personal information in line with the Australian Privacy Principles under the Privacy Act 1988 (Cth). If you have a concern about how we handle your information, please contact us and we will work to resolve it."] },
  ];

  return (
    <LegalPage
      seoTitle="Privacy Policy"
      seoDescription="ND Curtains privacy policy — how we collect, use and protect your personal information when you request a curtain or blind quote."
      path="/privacy"
      overline="Your privacy"
      title="Privacy Policy"
      draft
      intro="This Privacy Policy explains how ND Curtains collects, uses and protects your personal information. This is a general policy and not legal advice; please review it before it is finalised."
      sections={sections}
      footerNote={<>Questions about your privacy? <Link to="/contact" className="text-gold hover:underline">Contact us</Link>.</>}
    />
  );
};

export default Privacy;
