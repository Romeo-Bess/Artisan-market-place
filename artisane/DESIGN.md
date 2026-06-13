---
name: Artisane
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#43474e'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#74777f'
  outline-variant: '#c3c6cf'
  surface-tint: '#436087'
  primary: '#123358'
  on-primary: '#ffffff'
  primary-container: '#2c4a70'
  on-primary-container: '#9cbae6'
  inverse-primary: '#abc8f5'
  secondary: '#94492d'
  on-secondary: '#ffffff'
  secondary-container: '#fd9e7b'
  on-secondary-container: '#773319'
  tertiary: '#442e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#5f4407'
  on-tertiary-container: '#d9b26d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#abc8f5'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#2a486e'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59b'
  on-secondary-fixed: '#380d00'
  on-secondary-fixed-variant: '#763218'
  tertiary-fixed: '#ffdea7'
  tertiary-fixed-dim: '#e8c17a'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5d4205'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style
The design system is built upon the concept of the "Quiet Curator." It seeks to evoke the serene, intentional atmosphere of a high-end contemporary art gallery. The brand personality is professional and trustworthy, yet deeply creative and community-focused.

The design style is a blend of **Sophisticated Minimalism** and **Editorial Elegance**. By prioritizing vast whitespace (the "White Cube" effect) and high-quality typography, the UI recedes into the background, ensuring that the artists' work remains the undisputed focal point. Interactions are fluid and understated, emphasizing quality over quantity.

## Colors
The palette is grounded in a "warm neutral" foundation to avoid the sterile feeling of pure clinical white. 

- **Primary (Gallery Blue):** A deep, scholarly blue used for primary actions, navigation states, and headers. It conveys stability and institutional trust.
- **Secondary (Terracotta):** A warm, earthy accent used sparingly for secondary CTAs, "New" badges, or price highlights, nodding to the raw materials of craftsmanship.
- **Neutral Base:** A series of warm beiges and soft grays (#F9F8F6) form the "walls" of the gallery.
- **Functional Colors:** Success, Error, and Warning states should be slightly desaturated to maintain the sophisticated aesthetic.

## Typography
The typographic scale establishes a clear hierarchy between "The Art" (Editorial Serif) and "The App" (Technical Sans-Serif).

- **EB Garamond** is used for all major headlines, product titles, and artist names. It should be set with tighter tracking in larger sizes to emphasize its classical proportions.
- **Hanken Grotesk** handles all functional UI elements, descriptions, and metadata. Its modern, sharp geometry provides a clean contrast to the serif’s curves.
- **Labels:** Use uppercase for category labels and small metadata to create a distinct visual "stamp" effect similar to gallery placards.

## Layout & Spacing
This design system utilizes a **Fixed Grid** on desktop (12 columns) and a **Fluid Grid** on mobile. 

The spacing philosophy is "Air over Content." Generous vertical margins between sections (up to 120px) allow the eye to rest. Art thumbnails should never feel crowded; use a minimum of 24px for gutters in product grids. For artist profiles, use asymmetrical layouts—placing text in a narrower central column while images break out to the full width—to mimic an editorial magazine layout.

## Elevation & Depth
In keeping with the minimalist theme, depth is achieved through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

- **Surface Tiers:** The main background is the lightest neutral. Cards and secondary containers use a slightly darker or lighter tint to differentiate without lifting off the page.
- **Ghost Borders:** Use 1px solid borders in a very light gray (#E5E5E5) for cards and input fields.
- **Depth:** When elevation is required (e.g., modals), use a single, extremely soft, expanded shadow (Blur 40px, Opacity 4%) with a hint of the Primary Color to maintain a "natural light" feel.

## Shapes
The shape language is **Soft (0.25rem)**. 

While the overall aesthetic is architectural and structured, a slight rounding on buttons and card corners prevents the UI from feeling sharp or aggressive. Product images should remain strictly sharp (0px radius) to respect the integrity of the artwork, while UI containers (buttons, inputs) take the 4px radius.

## Components
- **Buttons:** Primary buttons use a solid Gallery Blue fill with white Hanken Grotesk text. Secondary buttons should be "Ghost" style with a 1px border. All buttons use a 4px corner radius and generous horizontal padding.
- **Art Cards:** Minimalist frames. Title in EB Garamond (Headline-md), Artist in Hanken Grotesk (Label-md). Price is positioned in the bottom right, subtle but clear. No drop shadows; use a 1px border on hover.
- **Artist Profile Headers:** Large-scale Display-lg typography centered with a wide-format cover image. Bio text is restricted to a 600px width for optimal readability.
- **Input Fields:** Bottom-border only (underlined) or very light 1px outlines. Focus states shift the border color to Gallery Blue.
- **Chips/Badges:** Small, rectangular with slightly rounded corners. Used for art mediums (e.g., "Oil on Canvas") using the Label-sm style.
- **Payment Forms:** High-contrast, clean fields with explicit "Secure Checkout" labeling in Hanken Grotesk to build trust.