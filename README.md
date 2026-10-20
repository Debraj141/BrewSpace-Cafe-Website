## Project Team

- Shashwat Gautam
- Debraj Paul
- Parth Kukreti


# BrewSpace --- Smart Café Website

A responsive front-end prototype for a smart café website, developed as
a CSE326 Internet Programming project concept.

**Live demo:** <https://debraj141.github.io/BrewSpace-Cafe-Website/>\
**GitHub repository:**
<https://github.com/Debraj141/BrewSpace-Cafe-Website>

## Project overview

BrewSpace presents a café brand, a digital menu, and a demo ordering
flow. The current published version is a front-end demonstration; it is
not a production payment or order-management system.

## Features

-   Café landing page, story section, and location/hours section
-   Responsive menu with category filters and live search
-   Product cards with prices and bestseller labels
-   Add-to-cart, quantity changes, subtotal calculation, and persistent
    cart (browser local storage)
-   Demo checkout with dine-in/takeaway options, optional table number,
    and notes
-   Demo order confirmation with a generated order ID and receipt
-   Menu manager for adding, editing, and deleting products
-   Browser local-storage persistence for menu, cart, and recent demo
    orders

> Verify every feature on the deployed site before presenting. If a
> feature does not work in the current published build, remove it from
> this list or label it as planned.

## Technologies

-   HTML5 for page structure
-   CSS3 for styling and responsive layout
-   JavaScript for menu interactions, cart logic, checkout demo, and
    local storage
-   GitHub for source-code hosting and version history
-   GitHub Pages for static website deployment

## Project structure

``` text
BrewSpace-Cafe-Website/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## How to run locally

1.  Download or clone this repository.
2.  Open `index.html` in a browser, or use the VS Code Live Server
    extension.
3.  Test the menu, search, cart, and demo checkout.

## Limitations

-   Data stored in local storage is limited to the browser/device and
    can be cleared by the user.
-   There is no shared server-side database in the current static
    deployment.
-   Checkout is a demo and does not process real payments or send orders
    to a café.
-   A menu manager on a static front end is not secure admin
    authentication.
-   No real customer or payment information should be collected.

## Suggested future improvements

-   Backend API and shared database
-   Secure staff/admin login and role-based access
-   Real order submission and order-status tracking
-   Payment gateway integration in a secure, compliant backend
-   QR-code generation for table-specific menus
-   Accessibility checks and automated tests

## Screenshots to add

Capture and add these screenshots to a `screenshots/` folder, then embed
them below: - `home.png` --- landing page - `menu.png` --- menu cards
and filters - `cart.png` --- cart with an item added - `checkout.png`
--- demo checkout form - `mobile.png` --- mobile-width layout

Example:

``` markdown
![BrewSpace home page](screenshots/home.png)
```

## Academic presentation note

Describe this project as a front-end prototype. Be ready to explain how
HTML structures the page, CSS styles the layout, JavaScript updates the
UI, and local storage persists demo data. Do not claim backend,
authentication, or real payment functionality unless you implement and
test it.
