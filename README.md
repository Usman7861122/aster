# Aster

Astro + React islands + Tailwind CSS v4 + Framer Motion.

## Start
```bash
npm install
npm run dev
```

## Structure
- `src/components/astro/` static components (no JS shipped)
- `src/components/react/` React islands (use `client:load`, `client:visible`, `client:idle`)
- `src/layouts/` page layouts
- `src/pages/` routes
- `src/styles/global.css` Tailwind import and theme tokens
