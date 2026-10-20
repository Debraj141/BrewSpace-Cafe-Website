# BrewSpace — Smart Café Website

A responsive front-end prototype for the LPU CA1 CSE326 project concept:
**BrewSpace: A Smart Café Website with QR-Based Digital Menu and Online Ordering System**

## Features in this starter
- Premium café landing page, story section and location/hours section
- Responsive menu with category filters and live search
- Product cards, prices and bestseller labels
- Add-to-cart, quantity changes, subtotal calculation and persistent cart
- Demo checkout with dine-in/takeaway, optional table number and notes
- Order confirmation with generated order ID and receipt
- Menu manager to add, edit and delete products
- `localStorage` persistence for menu, cart and the latest 30 demo orders
- Keyboard escape/close behavior, basic form validation, image fallback and mobile navigation

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a browser. A simple local server is recommended if your browser restricts features.
3. For a local server, from this folder run `python -m http.server 8000`, then visit `http://localhost:8000`.

No build tools or npm packages are required.

## Project structure
- `index.html` — page structure and dialogs
- `styles.css` — design system, responsive layout, components and interactions styling
- `app.js` — sample menu data, search/filter, cart, checkout, local persistence and admin menu CRUD

## Blueprint / implementation plan
### Phase 1 — Foundation
- Agree on brand, palette and problem statement with faculty.
- Keep semantic HTML sections and accessible labels.
- Use CSS custom properties for consistent theme values.

### Phase 2 — Digital menu
- Model each menu item with `id`, `name`, `category`, `price`, `description`, `image`, `popular`.
- Render menu from JavaScript data rather than repeating product markup.
- Combine search text and selected category for filtering.

### Phase 3 — Cart and checkout
- Cart stores product IDs and quantities; product prices are always read from menu data.
- Subtotal is calculated from current menu prices.
- Checkout validates the customer's name and creates a demo order ID.
- Receipt is shown locally. No payment is processed.

### Phase 4 — Admin menu manager
- Add, edit and delete products.
- Validate product name and positive price.
- Persist menu edits in browser `localStorage`.
- Explain during viva that this is a prototype, not a secure, multi-user admin system.

### Phase 5 — Testing
- Search finds matching product names/descriptions.
- Every category filter works and can be changed repeatedly.
- Add products; increase/decrease quantity; remove at zero.
- Cart count and subtotal update correctly.
- Refresh page and verify cart/menu persist.
- Checkout shows order ID, order type, line items and total.
- Add/edit/delete products in menu manager.
- Test narrow mobile width, keyboard Escape, invalid forms and broken image fallback.

### Phase 6 — Submission and presentation
- Push all source files to a GitHub repository.
- Deploy the static site to GitHub Pages or Netlify.
- Generate a QR code that points to the deployed site for a table-menu demonstration.
- Record a video: problem → proposed solution → feature walkthrough → technologies → individual contributions.
- Put the project title, team name, course code, all registration numbers, GitHub link, deployed link and video link in the required CA1 submission sheet.

## Important limitations
- This is a **front-end demo**. Orders are stored only in the current browser, not sent to a café or shared with staff.
- The admin menu is not protected by authentication. Do not use it for a real business as-is.
- No real payment gateway is connected.
- Images are loaded from Unsplash URLs, and Google Fonts are loaded online; internet access is needed for those assets.
- The brief says to work on an assigned/approved problem statement. Confirm that a café ordering portal is approved by your faculty before submitting it as the final topic.
