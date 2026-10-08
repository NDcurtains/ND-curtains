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
  { src: "/gallery/curtains/1.jpg", alt: "Custom curtains by ND Curtains" },
{ src: "/gallery/curtains/2.jpg", alt: "Made to measure curtains by ND Curtains" },
{ src: "/gallery/curtains/3.jpg", alt: "Elegant custom curtains in Melbourne" },
{ src: "/gallery/curtains/4.jpg", alt: "Luxury curtains by ND Curtains" },
{ src: "/gallery/curtains/5.JPG", alt: "sheer curtains by ND Curtains" },
{ src: "/gallery/curtains/6.JPG", alt: "Luxury sheer curtains by ND Curtains" },
{ src: "/gallery/curtains/7.JPG", alt: "Affordable Curtains" },
{ src: "/gallery/curtains/8.JPG", alt: "Sheer curtains" },
{ src: "/gallery/curtains/9.JPG", alt: "Blockout curtains" },
{ src: "/gallery/curtains/10.JPG", alt: "Cheap curtains" },
{ src: "/gallery/curtains/11.JPG", alt: "Quality curtains" },
{ src: "/gallery/curtains/12.JPG", alt: "Good fabric curtains" },
{ src: "/gallery/curtains/13.JPG", alt: "Modern curtains" },
{ src: "/gallery/curtains/14.JPG", alt: "Traditional curtains" },
{ src: "/gallery/curtains/15.JPG", alt: "Best curtains" },
{ src: "/gallery/curtains/pink-curtains.jpeg", alt: "Pink custom curtains by ND Curtains" },
  
  // Example of a locally uploaded photo (uncomment and match your file):
  // { src: "/gallery/curtains/lounge-sfold.jpg", alt: "S-Fold sheer curtains in a lounge" },
];

export const BLIND_GALLERY = [
  { src: "/gallery/blinds/blinds.jpeg", alt: "Custom blinds by ND Curtains" },
  { src: "/gallery/blinds/living.JPG", alt: "Custom blinds by ND Curtains" },
  { src: "/gallery/blinds/kitchen.JPG", alt: "Custom blinds by ND Curtains" },
  { src: "/gallery/blinds/bedroom.JPG", alt: "Custom blinds by ND Curtains" },
  { src: "/gallery/blinds/dining.JPG", alt: "Custom blinds by ND Curtains" },
  { src: "/gallery/blinds/B1.JPG", alt: "Affordable blinds" },
  { src: "/gallery/blinds/B2.JPG", alt: "Quality blinds" },
  { src: "/gallery/blinds/B3.JPG", alt: "Luxury Blinds" },
  { src: "/gallery/blinds/B4.JPG", alt: "Best blinds" },
  { src: "/gallery/blinds/B5.JPG", alt: "Blinds in Melbourne" },

  // Example of a locally uploaded photo (uncomment and match your file):
  // { src: "/gallery/blinds/kitchen-zebra.jpg", alt: "Zebra day-and-night blind in a kitchen" },
];
