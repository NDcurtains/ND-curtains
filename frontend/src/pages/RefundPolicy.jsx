import React from "react";
import { Link } from "react-router-dom";
import LegalPage from "../components/LegalPage";
import { BUSINESS } from "../lib/constants";

const RefundPolicy = () => {
  const sections = [
    {
      heading: "Deposits",
      body: [
        "A 50% deposit is required to confirm a custom-made order, with the remaining balance due at installation. Your deposit secures your fabric selection, measurements and production slot, and allows us to order materials and schedule manufacturing.",
      ],
    },
    {
      heading: "Custom-Made Orders",
      body: [
        "All curtains and blinds are custom-made to your specifications (fabric, style, size and finish). As these items are made to order and cannot be resold, they are generally not eligible for change-of-mind returns or refunds once materials have been specially ordered or cut, or once manufacturing has commenced.",
      ],
    },
    {
      heading: "Change-of-Mind Cancellations",
      body: [
        "If you change your mind, please contact us as soon as possible. If manufacturing has not commenced and materials have not been specially ordered or cut, we will do our best to accommodate a cancellation; any non-recoverable costs already incurred may be deducted from your deposit.",
        "Once materials have been specially ordered or cut, or manufacturing has commenced, deposits and payments may be non-refundable to cover the costs of your custom order.",
      ],
    },
    {
      heading: "Order Changes",
      body: [
        "Requests to change fabric, style, colour or measurements can only be accepted before materials are ordered and manufacturing begins. Changes after this point may not be possible, or may incur additional costs.",
      ],
    },
    {
      heading: "Manufacturing Commencement",
      body: [
        "\u201CManufacturing commenced\u201D means the point at which your fabric or materials have been specially ordered or cut, or production of your custom items has begun.",
      ],
    },
    {
      heading: "Faulty or Damaged Products",
      body: [
        "If your product is faulty, not of acceptable quality, does not match its description, or is not fit for its intended purpose, you are entitled to a remedy under the Australian Consumer Law. Depending on the issue, this may include repair, replacement or refund. Please contact us with details (and photos where possible) and we will work with you to resolve it promptly.",
      ],
    },
    {
      heading: "Installation Issues",
      body: [
        "Where we provide installation and an issue arises from our installation workmanship, please contact us and we will assess and rectify the issue.",
      ],
    },
    {
      heading: "Your Rights Under Australian Consumer Law",
      body: [
        "Nothing in our custom-order, deposit or cancellation terms limits, excludes or modifies any consumer guarantee, right or remedy you are entitled to under the Australian Consumer Law (ACL). Our goods come with guarantees that cannot be excluded under the ACL. You retain all rights and remedies available to you under Australian law.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `For any cancellation, change or product concern, contact us at ${BUSINESS.email} or on ${BUSINESS.phone}.`,
      ],
    },
  ];

  return (
    <LegalPage
      seoTitle="Refund & Cancellation Policy"
      seoDescription="ND Curtains refund and cancellation policy for custom-made curtains and blinds. Deposit terms, change-of-mind cancellations and your rights under Australian Consumer Law."
      path="/refund-policy"
      overline="Our policy"
      title="Refund & Cancellation Policy"
      intro="At ND Curtains, we specialise in custom-made and made-to-measure window furnishings. Because each order is manufactured specifically for your windows and chosen fabrics, our cancellation and refund terms reflect the tailored nature of our products. This policy operates alongside — and does not exclude, restrict or modify — your rights under the Australian Consumer Law (ACL)."
      sections={sections}
      footerNote={<>Questions about your order? <Link to="/contact" className="text-gold hover:underline">Contact us</Link> and we'll be glad to help.</>}
    />
  );
};

export default RefundPolicy;
