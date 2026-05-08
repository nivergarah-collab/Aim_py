---
name: Aim_py
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#a4c9ff'
  on-secondary: '#00315d'
  secondary-container: '#0267b8'
  on-secondary-container: '#d6e5ff'
  tertiary: '#89ceff'
  on-tertiary: '#00344d'
  tertiary-container: '#009ada'
  on-tertiary-container: '#002d43'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.7'
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is centered on a "Technical Ethereal" aesthetic, blending the precision of a high-end development environment with the fluid, inviting nature of a modern educational platform. The target audience consists of developers and students who value a focused, low-friction learning experience.

The visual style is **Modern-Glassmorphic**, utilizing deep oceanic backgrounds and luminous accents to create a sense of infinite digital space. It prioritizes clarity through high-quality typography and spacious layouts while introducing delight through 3D transformations and subtle luminescence. The emotional response should be one of "effortless mastery"—an environment that feels both sophisticated and supportive.

## Colors

This design system utilizes a cold, high-contrast dark palette. The foundation is a deep midnight blue (`#0B1121`), providing a stable, low-eye-strain base for long coding sessions. 

Accents are strictly limited to the cool spectrum:
- **Primary Blue (#3B82F6):** Used for primary actions, progress indicators, and active states.
- **Cyan Secondary (#60A5FA):** Used for highlighting syntax, success states, and secondary interactive elements.
- **Cold Whites (#F8FAFC):** Reserved for high-priority text to ensure maximum legibility against the dark background.
- **Surface Tints:** Secondary surfaces use a slightly lighter navy (`#161E2D`) to establish hierarchy without relying on heavy borders.

## Typography

Typography is used to distinguish between "Interface" and "Content." 

- **UI Elements:** Use **Geist** for its technical, geometric precision. Headlines should have tighter letter spacing to maintain a "locked-in" feel.
- **Prose:** Use **Inter** for body text to ensure maximum readability during long-form educational content. 
- **Code:** Use **JetBrains Mono** for all code blocks and inline variables. The increased line-height in code blocks is intentional to improve scanning of complex logic.

All mobile headlines scale down by a factor of 0.8x, while body text remains consistent for accessibility.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop and a **Fluid Fluid** model for mobile. 

- **Desktop:** 12-column grid centered in a 1280px container. Large 40px - 64px vertical margins between sections to maintain a "clean and spacious" feel.
- **Mobile:** 4-column grid with 16px side margins.
- **Rhythm:** All spacing must be a multiple of 4px. Use "MD" (24px) as the standard padding for cards and containers to allow the UI to breathe. 
- **Alignment:** Content is primarily left-aligned to mirror the flow of code.

## Elevation & Depth

Depth is conveyed through a combination of **Tonal Layering** and **Blue Ambient Glows**. 

- **Level 0 (Background):** `#0B1121`.
- **Level 1 (Cards/Sidebar):** `#161E2D` with a subtle 1px border of `rgba(255,255,255,0.05)`.
- **Level 2 (Popovers/Active Cards):** Same as Level 1 but with a multi-layered shadow: a sharp 4px black shadow for contact and a soft 20px cyan-tinted glow (`rgba(59, 130, 246, 0.1)`) for lift.
- **Interactive Depth:** Floating elements should use a "Y-axis offset" animation on hover, combined with an increased glow intensity to simulate moving closer to the light source.

## Shapes

The shape language is "Soft-Modern." Use a consistent radius to maintain a polished look.

- **Standard Containers:** 12px (cards, sidebars, main content areas).
- **Interactive Elements:** 8px (buttons, input fields).
- **Outer Shells:** 16px (large modal containers or featured sections).
- **Code Blocks:** 12px to match standard containers, ensuring internal code lines have 0px radius at their edges.

## Components

### Buttons
- **Primary:** Solid `#3B82F6` with white text. On hover, apply a 10px blue outer glow.
- **Secondary:** Ghost style with a 1px border of `rgba(59, 130, 246, 0.5)` and a subtle background blur.

### Code Cards
- **3D Effect:** On hover or click, the card utilizes a `perspective: 1000px` 3D flip animation. The "back" of the card contains metadata or execution results.
- **Styling:** Deep `#010409` background (standard dark code bg), 12px padding, and "macOS style" window controls in the top left.

### Inputs
- **Field:** Dark background (`#0B1121`), 1px border. On focus, the border turns `#3B82F6` and gains a soft inner glow.

### Specialized Components
- **Progress Halo:** A circular progress indicator for lesson completion using a cyan gradient.
- **Glow-Line:** A thin, 1px horizontal separator that fades out at the edges, used to divide sections without creating hard visual breaks.