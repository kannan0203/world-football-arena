

# World Football Universe — Interactive Website

## Overview
An ultra-premium football experience website with a FIFA broadcast aesthetic featuring neon green (#00FF41) on deep black-green (#000800), Bebas Neue + Rajdhani fonts, and rich animations throughout.

## Sections to Build

### 1. Navbar
- Fixed top nav with neon green accents, links to all sections
- Hamburger menu on mobile

### 2. Animated Hero
- Full-screen with CSS grass pattern at bottom, floating football emoji particles on canvas
- Glowing "WORLD FOOTBALL UNIVERSE" title with pulsing text-shadow
- Rolling football SVG animation, 3 counting stat counters (211 Nations, 3.5B Fans, 100+ Years)
- "KICK OFF" CTA button, scrolling quotes ticker

### 3. Legendary Players (12 cards)
- Responsive grid of FIFA-style player cards with real Wikipedia images + onError fallback (green gradient + initials)
- Each card: photo, name, country flag, position badge, 4 animated stat bars, overall rating, trophy badges
- Hover: lift + neon glow. Click: modal with full career details, stats, trophies, quotes
- Players: Messi, Ronaldo, Mbappé, Haaland, Vinicius Jr, Bellingham, Pedri, De Bruyne, Salah, Ronaldinho, Pelé, Zidane

### 4. Trophy Cabinet (6 trophies)
- Cards with large trophy emoji, gold neon glow, record holder info
- 3D rotateY(360°) animation on hover
- World Cup, UCL, Ballon d'Or, Premier League, Copa del Rey, Club World Cup

### 5. Stadium Showcase (6 stadiums)
- Real Wikipedia stadium images with onError fallback
- Name, city, capacity (neon green), home team, year built, famous moment
- Camp Nou, Wembley, Maracanã, Bernabéu, Old Trafford, Allianz Arena

### 6. FIFA World Rankings Table
- Top 20 nations, sortable columns, search/filter bar
- Gold/silver/bronze highlighting for top 3
- Green/red arrows for ranking changes

### 7. Recent Match Results (8 matches)
- Score cards with team flags, large score, competition, date, MOTM
- Color-coded glows: green for winner side, yellow for draws

### 8. Football Quiz (15 questions)
- 20-second animated countdown per question
- Correct = green burst + points, Wrong = red shake + answer shown
- Rank system from "Sunday League" to "Football Legend", confetti for top scores

### 9. Messi vs Ronaldo Debate
- Split screen with real images, head-to-head animated stat bars
- Vote buttons with live percentage tracking and animated vote bar

### 10. Background Music Button
- Fixed bottom-left floating button with pulsing ring animation
- Crowd cheering ambient sound toggle

## Design System
- Colors: #000800 bg, #00FF41 primary, #00D4AA secondary, #FFD700 gold, #FF3B30 red
- Cards: #050F05 with neon green border glow
- Fonts: Bebas Neue (headings), Rajdhani (body) via Google Fonts
- Subtle hexagon pattern on dark backgrounds
- All sections scroll-reveal animated

## Technical Approach
- React + TypeScript + Tailwind CSS
- Framer Motion for scroll reveals, hover effects, stat animations
- Canvas API for hero particle system
- Recharts where needed
- All data hardcoded
- Fully responsive (320px+)
- onError fallback on all images

