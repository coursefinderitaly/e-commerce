# Glam AURA - Project & Theme Guidelines

This document serves as the source of truth for the project's design system, theme, and core development principles. AI assistants and developers should reference this file to maintain consistency.

## 1. Core Development Principles
- **Mobile-First & Responsive Design**: The application MUST be perfectly usable and beautiful on mobile screens. Always design for mobile preview first, then scale up using Tailwind's `sm:`, `md:`, and `lg:` responsive prefixes. Ensure no elements overlap or break on small screens (e.g., hiding redundant logos on mobile).
- **Premium User Experience**: The store focuses on high-end cosmetics. Interactions, hover effects, and spacing should feel luxurious, intentional, and uncluttered.
- **Smooth Animations**: Use Framer Motion for micro-interactions and page transitions, ensuring they are smooth and subtle.

## 2. Theme & Aesthetics
- **Aesthetic Focus**: Premium, minimalistic, focusing exclusively on Cosmetics, Skincare, and Fragrances.
- **Base Theme**: Dark Mode Native.
  - Global Background: `ink` (`#1C1712`)
  - Global Text: `paper` (`#F3F1EC`)

## 3. Color Palette
Tailwind custom colors configured in `tailwind.config.js`:
- `ink`: `#1C1712` (Primary Dark Background)
- `paper`: `#F3F1EC` (Primary Light Text, Overlays, High-Contrast UI)
- `bone`: `#EDE7DC` (Secondary Text, Muted Accents)
- `rust`: `#B2502B` (Warm Accent)
- `indigo`: `#3E4C6D` (Cool Accent)
- `berry`: `#8A3F56` (Cosmetics Accent)
- `sage`: `#79876B` (Success / Badges)

## 4. Typography
- **Display / Headings**: `Fraunces` (serif) - Used for high-impact titles (`h1`, `h2`, `h3`).
- **Body / Interface**: `Manrope` (sans-serif) - Used for all paragraphs, links, and buttons.

## 5. UI & Component Rules
- **Scrollbars**: Custom dark-theme scrollbars are defined globally in `index.css`. Do not use `scrollbar-hide` unless specifically required, let the custom styled scrollbar show.
- **Buttons**: Primary buttons use `bg-paper text-ink` to pop beautifully against the dark background.
- **Logos**: Always use the exact company logo (`/logo1.png`) with NO color-altering CSS filters (like `invert` or `brightness-0`). Keep it prominent.
- **"Coming Soon" Elements**: The 'Fashion' and 'Clothing' categories are currently disabled. They must remain in the navigation and category sections but MUST feature a "Coming Soon" badge, be unclickable (`cursor-not-allowed` / `preventDefault`), and have dimmed styling.
