# Sanitary & Hardware Product Catalog
Internal application used to manage product listings for the sanitary & hardware business.
This system allows adding, updating, deleting, and displaying products with images.

Application Purpose

This app is used to:

Manage product catalog
Upload product images
Maintain product information
Display products on the website
Admin can manage everything from the admin panel.

Live Application

Production URL:

https://sanitary-hardware-api.onrender.com

Admin panel:

https://sanitary-hardware-api.onrender.com/admin

Tech Stack

Frontend
React
Vite
TypeScript

Backend
Node.js
Express

Database
PostgreSQL (Neon)

Image Storage
Cloudinary

Hosting
Render

System Architecture
User Browser
     │
     ▼
React Frontend
     │
     ▼
Express Backend (Render)
     │
     ▼
PostgreSQL Database (Neon)
     │
     ▼
Cloudinary (Image Storage)

Images are stored on Cloudinary, not on the server.