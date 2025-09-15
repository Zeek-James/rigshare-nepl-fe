# RigShare Mono Repo Structure

This project has been converted to a mono repo structure to support multiple applications for different user types.

## Structure

```
rigshare-nepl-fe/
├── apps/
│   ├── operators/          # Main operators application
│   └── admin/              # Admin dashboard application
├── packages/
│   ├── shared-ui/          # Shared UI components
│   ├── shared-auth/        # Authentication utilities
│   └── shared-utils/       # HTTP clients and utilities
├── package.json            # Root workspace configuration
└── README.md
```

## Applications

### Operators App (`apps/operators/`)
- Main application for equipment operators
- Handles equipment management, lease requests, well programs
- Located at: `/apps/operators/`

### Admin App (`apps/admin/`)  
- Administrative dashboard for system management
- User management, system settings, analytics
- Located at: `/apps/admin/`

## Shared Packages

### @rigshare/shared-ui
- Common UI components (buttons, modals, forms)
- Shared styling and theme configuration
- Exports: `CustomButton` and more

### @rigshare/shared-auth
- Authentication and authorization utilities
- Permission handling and route protection
- Exports: `hasPermissions`, `getStoredPermissions`

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

# Build all apps
npm run build:all

# Run tests
npm test
```

## Benefits

1. **Code Reuse**: Shared components and utilities across apps
2. **Independent Deployment**: Each app can be deployed separately
3. **Better Organization**: Clear separation of concerns by user type
4. **Scalable Architecture**: Easy to add new apps (vendors, mobile, etc.)
5. **Consistent Authentication**: Shared auth logic across all apps

## Migration Notes

- Main application code moved from `/src/` to `/apps/operators/src/`
- Import paths updated to use shared packages
- Each app has its own `package.json` and build configuration
- Workspace configuration enables shared dependency management