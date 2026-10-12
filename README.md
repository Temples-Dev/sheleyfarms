# SheleyFarms

Marketing and platform website for SheleyFarms, an agricultural investment platform connecting capital with local farming. Browse farms, investment options, and company information; includes patron, farmer, and admin dashboards.

**Status:** Maintained client project, open source under MIT.
**Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4.

## Routes

- `/` — landing page
- `/about`, `/faq` — company information
- `/farms` — farm listings
- `/auth` — sign-in
- `/dashboard`, `/farmer`, `/admin` — role dashboards (patron, farmer, admin)

## How to run

Prerequisites: Node 20+ with `pnpm`.

```bash
pnpm install
pnpm run dev      # http://localhost:3000
pnpm run build    # production build
pnpm start        # serve the production build
pnpm run lint     # eslint
```

No environment variables or external services are required for local development.

## License

MIT — see `LICENSE`.
