# Gallery images

Drop your images into the matching folder:

- `frontend/public/gallery/curtains/` → shown on the **Curtains** page gallery
- `frontend/public/gallery/blinds/` → shown on the **Blinds** page gallery

**To add or remove an image**, edit `frontend/src/lib/gallery.js` — it's just a list.
Add a line like:

```js
{ src: "/gallery/curtains/living-room.jpg", alt: "Sheer curtains in a Melbourne living room" }
```

- Use JPG or WebP (WebP preferred, smaller).
- Recommended size: 1200–1600 px on the longest edge.
- The `src` is `/gallery/<curtains|blinds>/<filename>` (matches the folder you dropped it into).
- Order in the file = order on the page.

Delete an image → delete the file **and** remove its line from `gallery.js`.
