// Gallery items shown on the /curtains and /blinds pages.
//
// HOW TO ADD A PHOTO:
//   1) Drop the image into `frontend/public/gallery/curtains/`
//      or `frontend/public/gallery/blinds/`
//   2) Add a new line below with the matching src path and alt text.
//
// The `tall` flag makes an item span two rows for editorial layout.

import { IMAGES } from "./constants";

export const CURTAIN_GALLERY = [
  // Placeholder items using the existing site imagery. Replace with real photos
  // by dropping files into /public/gallery/curtains/ and updating the src paths.
  { src: IMAGES.sheer, alt: "Sheer curtains in a Melbourne living room", tall: true },
  { src: IMAGES.blockout, alt: "Blockout curtains in a bedroom" },
  { src: IMAGES.custom, alt: "Custom pinch pleat curtains" },
  { src: IMAGES.sheerAlt, alt: "Light-filtering sheer curtains" },
  { src: IMAGES.interior, alt: "Layered curtains in a Melbourne home" },
  // Example of a locally uploaded photo (uncomment and match your file):
  // { src: "/gallery/curtains/lounge-sfold.jpg", alt: "S-Fold sheer curtains in a lounge" },
];

export const BLIND_GALLERY = [
  { src: "/gallery/blinds/blinds.jpeg", alt: "Custom blinds by ND Curtains" },
  { src: IMAGES.blinds, alt: "Roller blinds in a Melbourne home", tall: true },
  { src: IMAGES.custom, alt: "Blinds layered with sheer curtains" },
  { src: IMAGES.interior, alt: "Blinds in a living space" },
  { src: IMAGES.sheerAlt, alt: "Sunscreen roller blind detail" },
  // Example of a locally uploaded photo (uncomment and match your file):
  // { src: "/gallery/blinds/kitchen-zebra.jpg", alt: "Zebra day-and-night blind in a kitchen" },
];
