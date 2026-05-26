# olive

## Deployment

This project is a Vite React single-page app prepared for Vercel.

- Build: `npm run build` (outputs to `dist`)
- Vercel: set framework to "Other" or use the included `vercel.json` which uses `@vercel/static-build` and rewrites all routes to `index.html` for SPA routing.

Quick deploy steps:

1. Push this repository to GitHub.
2. In Vercel, import the project and set the build command to `npm run build` and the output directory to `dist` (these are usually detected automatically).
3. Deploy and verify the site.

