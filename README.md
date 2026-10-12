# SheleyFarms

Marketing and platform website for SheleyFarms, an agricultural investment platform connecting capital with local farming. Browse farms, investment options, and company information; includes patron, farmer, and admin dashboards.

**Status:** Maintained client project, open source under MIT.
**Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4.
**Backend:** Django + Django REST Framework, PostgreSQL, Redis + Celery (new; the web UI still runs on mock data until the API integration lands).

## Routes

- `/` — landing page
- `/about`, `/faq` — company information
- `/farms` — farm listings
- `/auth` — sign-in
- `/dashboard`, `/farmer`, `/admin` — role dashboards (patron, farmer, admin)

## How to run

### Full stack (recommended)

```bash
cp .env.example .env
docker compose up --build
# web: http://localhost:3000/
# api: http://localhost:8000/api/v1/health/
```

Services: `web` (Next.js), `api` (Django), `worker` (Celery),
`db` (PostgreSQL 17), `redis` (broker).

### Frontend only

Prerequisites: Node 20+ with `pnpm`.

```bash
pnpm install
pnpm run dev      # http://localhost:3000
pnpm run build    # production build
pnpm start        # serve the production build
pnpm run lint     # eslint
```

No environment variables or external services are required for the frontend alone.

### Backend only

Prerequisites: Python 3.13 with `uv`.

```bash
cd backend
uv venv && uv pip install -r requirements-dev.txt
python manage.py migrate
python manage.py runserver
pytest            # foundation tests
ruff check . && ruff format --check .
```

## License

MIT — see `LICENSE`.
