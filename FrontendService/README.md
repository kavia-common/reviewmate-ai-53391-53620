# ReviewMate AI – FrontendService

Next.js (App Router) app implementing the ReviewMate UI:
- Authentication via NextAuth.js (credentials provider calling backend /auth/login)
- Global state via Zustand (org/location switching, UI)
- Server state via React Query
- UI with Tailwind CSS and Radix UI primitives
- Charts with Recharts
- Pages: Dashboard, Reviews, Analytics, Team, Settings

## Environment
Create `.env.local` (use `.env.example`):
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-strong-secret
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

## Development
Install dependencies and run dev server:
```
npm install
npm run dev
```

Open http://localhost:3000

First visit redirects to `/auth/signin`. Use backend-provisioned credentials.

## API Integration
The frontend expects a BackendAPIService exposing endpoints:
- POST /auth/login -> { user, accessToken }
- GET /organizations
- GET /organizations/:orgId/locations
- GET /dashboard?orgId&locationId
- GET /reviews?orgId&locationId&search&source&sentiment&rating&page&pageSize
- GET /reviews/:id
- POST /reviews/:id/reply
- GET /analytics?orgId&locationId&range
- GET /organizations/:orgId/team
- POST /organizations/:orgId/team/invite
- DELETE /organizations/:orgId/team/:memberId

Adjust routes in `src/hooks/useApi.ts` if your backend differs.

## Notes
- Protected routes enforced by next-auth middleware.
- AppShell provides navigation and org/location switchers.
- Charts render only when data present.

