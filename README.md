# 🌿 GlowAI: Full-Stack Skincare & Cosmetics Platform

A full-stack **MERN** (MongoDB, Express, React, Node.js) skincare and cosmetics platform providing personalized recommendations through AI-powered skin & hair analysis, doctor consultations, routine streak tracking, and an e-commerce marketplace.

Both servers are currently live and ready for testing:

* **Frontend App**: http://localhost:5173/
* **Backend API & Health**: http://localhost:5000/api/health

---

### 🌟 Implemented Features

1. **🔬 AI-Powered Skin & Hair Diagnostics** (`AIAnalyzer.jsx`)

   * **Dual Diagnostic Modes**: Facial Skin Scan vs. Hair & Scalp Analysis.
   * **Image Upload & Camera Simulation**: Supports custom photo uploads or instant sample photo presets (`📸 Load Sample Face`, `💇 Load Sample Scalp`).
   * **Biometric Landmark Scanner**: Animated laser beam scan with real-time biometric progress feedback.
   * **Clinical Biomarker Gauges**: Circular overall score (0–100%) plus 6 granular meters (Hydration %, Sebum Balance %, Barrier Resilience %, Pore Clarity %, Sensitivity Index %, Elasticity %).
   * **Personalized 3-Phase Regimen**: Formulates tailored Morning (AM), Evening (PM), and Weekly Intensive routines synced with active ingredients.
   * **Smart Matched Products & 1-Click Cart**: Dynamically matches formulations from the database and allows adding the entire prescribed routine to the shopping bag with one click.

2. **🛍️ Product Marketplace & Feedback Management** (`Marketplace.jsx` & `ProductDetails.jsx`)

   * Real-time search by ingredients, formula type, or brand.
   * Dynamic multi-facet filters: Category, Target Concern (Acne, Hyperpigmentation, Dryness, Hair Loss, etc.), Skin Compatibility, and Sorting (Rating, Price Low/High, Newest).
   * Detailed product view with active ingredients breakdown, clinical how-to-apply guide, and verified reviews.
   * Verified customer review and star-rating submission form.

3. **👩‍⚕️ Certified Dermatologist & Trichologist Consultations** (`Doctors.jsx`)

   * Physician directory with credentials, years of experience, ratings, and consultation fees.
   * Specialty filtering: Acne Specialist, Trichologist / Hair Loss, Anti-Aging, Board Certified FAAD.
   * Interactive appointment booking modal with day and time slot selection, symptom descriptions, and confetti confirmation.

4. **📋 Routine Tracker, Skin Journey & Order History** (`Profile.jsx`)

   * **Daily AM & PM Routine Tracker**: Interactive morning and evening checklists with real-time streak counter (🔥 flame badge).
   * **Skin Journey History**: Archives past scans to track dermal improvements over time.
   * **Telehealth Appointments**: View upcoming consultations with video room entry status.
   * **Order History**: Real-time order tracking with unique tracking codes (`GLOW-XXXXXX`) and itemized receipts.

5. **🛒 Cart & Multi-Step Checkout** (`CartDrawer.jsx` & `Checkout.jsx`)

   * Slide-over bag drawer with free-shipping progress tracker and promo discount support (Try coupon `GLOW20` for 20% off).
   * Secure multi-step checkout with delivery address inputs, payment selection (Card, PayPal, COD), and celebratory order confirmation.

6. **🌓 Responsive Luxury UI & Light/Dark Theme** (`ThemeToggle.jsx`)

   * Seamless light/dark mode switch persisted across browser sessions.
   * Fully responsive on mobile, tablet, and desktop screens.
