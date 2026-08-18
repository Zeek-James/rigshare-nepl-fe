# RigShare Mono Repo Structure

This project is a mono repo hosting one React app that builds into two
role-specific deployments, plus shared packages.

## Structure

```
rigshare-nepl-fe/
├── apps/
│   └── main/               # Single app, builds as either "admin" or "operators"
├── packages/
│   ├── shared-ui/          # Shared UI components
│   ├── shared-auth/        # Authentication utilities
│   └── shared-utils/       # HTTP clients and utilities
├── package.json            # Root workspace configuration
└── README.md
```

## One app, two roles

`apps/admin` and `apps/operators` used to be separate, nearly-identical
copies of the same ~430 files (same components, same routes, same
controllers). They've been merged into `apps/main`; the handful of places
that actually differed by role (the dev API base URL, and which dashboard
component `/dashboard` renders) now branch on the `REACT_APP_ROLE`
environment variable (`admin` | `operators`, see `src/config.js` and
`src/constants/routes.js`) instead of living in two divergent source trees.

- **Admin** (`REACT_APP_ROLE=admin`): administrative dashboard - user
  management, system settings, analytics.
- **Operators** (`REACT_APP_ROLE=operators`, the default): equipment
  management, lease requests, well programs.

Each role is still built and deployed separately - two Vercel/Netlify
targets, both pointing at `apps/main` with a different `REACT_APP_ROLE`
build-time env var - so they remain independently deployable even though
the source lives in one place now.

## Shared Packages

### @rigshare/shared-ui
- Common UI components (buttons, modals, forms)
- Shared styling and theme configuration
- Exports: `CustomButton` and more

### @rigshare/shared-auth
- Authentication and authorization utilities: permission handling, route
  protection, and the `AuthProvider`/`useAuth` context
- Exports: `hasPermissions`, `getStoredPermissions`, `clearPermissionCache`,
  `AuthProvider`, `useAuth`
- Note: this package is plain JS (no JSX) - see the comment at the top of
  `AuthContext.js`. Create React App's babel-loader doesn't transpile JSX
  from workspace packages outside an app's own `src/`, so anything meant to
  be consumed by `apps/main` needs to either avoid JSX or live in `src/`.

### @rigshare/shared-utils
- HTTP clients with authentication
- Configuration management
- Common utility functions
- Exports: `HttpClient`, `AuthenticatedHttpClient`, `config`

## Development Commands

```bash
# Install all dependencies
npm run install:all

# Start operators app (default)
npm start
# or specifically
npm run start:operators

# Start admin app
npm run start:admin

# Build operators app
npm run build:operators

# Build admin app
npm run build:admin

# Build both role variants (sanity check locally; each writes to
# apps/main/build in turn - fine for local verification, but real deploys
# build one role per target)
npm run build:all

# Run tests
npm test
```

## Migration Notes

- `apps/admin` and `apps/operators` were merged into `apps/main` on
  2026-08-18 to eliminate ~430 duplicated files. See git history for the
  prior two-app structure if you need to compare against it.
- Each Vercel/Netlify deploy target sets `REACT_APP_ROLE` as its own
  build-time environment variable to select which role it builds.
