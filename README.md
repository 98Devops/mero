# Mero Tech Marketing Website

A modern, performant marketing website built with Next.js 14, TypeScript, and TailwindCSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animation**: Framer Motion
- **Form Validation**: Zod
- **Security**: DOMPurify

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/app              - Next.js App Router pages
/components       - React components
  /ui             - UI components (buttons, cards, etc.)
  /sections       - Page sections (hero, services, etc.)
  /forms          - Form components
  /navigation     - Navigation components
/lib              - Utility functions and constants
/styles           - Animation variants and styles
/public           - Static assets
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Performance Targets

- Lighthouse Score: 90+
- Load Time: < 2 seconds
- Bundle Size: < 200KB (gzipped)
