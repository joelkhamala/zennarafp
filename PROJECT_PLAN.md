# ZENARA Website Development Plan

## Project Overview
Building a complete website for ZENNARA LTD - A Property & Facility Management company operating across Kenya, Uganda, Tanzania, and Rwanda.

## Brand Identity
- **Company**: ZENNARA LTD (Kenya)
- **Domain**: www.zennarafp.com
- **Email**: info@zennarafp.com
- **Phone/WhatsApp**: +254 789 115737
- **Service Mark**: ZEN F&P Property & Facility Management
- **Coverage**: Kenya · Uganda · Tanzania · Rwanda
- **Business Model**: Property & Facility Management ONLY (NO sales, brokerage, or lettings)

## Color Palette
- **Primary Dark**: #080808 (Black), #1C1C1C (Charcoal)
- **Gold Accent**: #C9A030 (Gold), #E2B84A (Gold Light)
- **Eco/Green**: #2D7A4F (Eco), #3BAA6A (Eco Light), #16A34A (Eco Bright)
- **Prism Greens**: #13562B (Dark), #166535 (Mid), #187D41 (Light)
- **Neutrals**: #F6F5F1 (Off-white), #8A8A8A (Grey), #C6C6C4 (Light Grey)

## Typography
- **Display/Headings**: Cormorant Garamond (serif) - 300, 400, 600, 700
- **Labels/Caps**: Barlow Condensed (sans-serif) - 400, 600, 700, 800
- **Body Text**: Barlow (sans-serif) - 300, 400, 500, 600

## Website Structure (7 Public Pages)

### 1. Home (/)
- Hero section: dark background, gold/green glow, stacked logo
- SecureRent feature band (flagship product)
- Services grid (8 service lines)
- Coverage map - KE · UG · TZ · RW
- Stats bar + eco strip
- CTA: Request a Proposal

### 2. SecureRent Programme (/securerent)
- How it works - 3-step timeline
- Landlord benefits
- FAQ accordion
- CTA: Enrol Your Property
- **Key Feature**: Guaranteed rent by 15th of every month

### 3. Property Management (/property-management)
- Service scope
- Reporting & KPIs
- Fee guidance (8-10% GMR)

### 4. Facility Management (/facility-management)
- Hard & soft FM services
- Preventive maintenance
- Eco/sustainability credentials

### 5. About ZENNARA (/about)
- Company profile - Kenyan incorporated
- East Africa coverage
- Values & approach

### 6. Contact (/contact)
- Contact form → info@zennarafp.com
- Phone/WhatsApp: +254 789 115737
- Nairobi office location

### 7. Insights/Blog (/insights)
- Industry insights
- Company updates
- Best practices

### 8. Client Portal (/portal) - Phase 2
- Landlord statements
- Maintenance requests
- Login only - link in nav

## Technical Requirements

### Integrations
- WhatsApp Business: Click-to-chat, +254 789 115737
- Contact form: → info@zennarafp.com
- Analytics: GA4 / Plausible
- Maps: Nairobi office embed

### Quality Standards
- Responsive to 360px
- Lighthouse score: 90+ on all categories
- WCAG AA contrast compliance
- Visible keyboard focus
- Respect `prefers-reduced-motion`
- OG/social cards using stacked logo

### Hard Constraints
- **NO** references to property sales, brokerage, or lettings
- **NO** founder or director names on public site
- Company speaks as an institution

## Development Timeline

### Weeks 1-2: Design & Content Lock
- High-fidelity designs for all pages
- Copy loaded from supplied files
- Sign-off

### Weeks 3-4: Core Build
- Home, SecureRent, PM & FM pages
- Component library
- CMS schema
- Responsive pass

### Weeks 5-6: Integrations & Remaining Pages
- Contact form, WhatsApp, analytics
- SEO/schema implementation
- About, Insights, legal pages

### Weeks 7-8: QA & Launch
- Cross-device QA
- Performance and accessibility audit
- DNS cutover to zennarafp.com
- Launch

## Key Features

### SecureRent Programme (Core Differentiator)
1. Tenant rent falls due at start of month
2. By the 15th, landlord is paid in full by ZENNARA (regardless of tenant payment status)
3. ZENNARA recovers outstanding rent from tenant, plus applicable late fee

**Positioning**: Certainty of income, professionally managed

## Next Steps
1. Update existing HTML templates with ZENNARA branding
2. Implement color scheme and typography
3. Create page-specific content based on handoff document
4. Build responsive components
5. Integrate required services
6. Test and optimize
