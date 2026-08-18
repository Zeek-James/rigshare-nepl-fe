// Optimized getStoredPermissions with caching
let cachedPermissions = null;

export const getStoredPermissions = () => {
  // Return cached permissions if available
  if (cachedPermissions) return cachedPermissions;

  const storedPermissions = localStorage.getItem("userPermissions");
  if (!storedPermissions) return [];

  try {
    const parsedPermissions = JSON.parse(storedPermissions);
    // Flatten all permissions from all modules into a single array of codenames
    cachedPermissions = parsedPermissions.reduce((allPermissions, module) => {
      const codenames = module.permissions.map((p) => p.codename);
      return [...allPermissions, ...codenames];
    }, []);

    return cachedPermissions;
  } catch (error) {
    console.error("Error parsing permissions:", error);
    return [];
  }
};

export const hasPermissions = (requiredPermissions) => {
  if (!requiredPermissions || requiredPermissions.length === 0) {
    // Allow unrestricted access if no permissions are required
    return true;
  }

  const userPermissions = getStoredPermissions();

  // If permissions haven't loaded yet - or the fetch failed - deny access to
  // permission-gated routes/actions instead of granting it. Failing open here
  // previously meant a failed or slow permissions fetch left the app
  // permanently unrestricted for the session.
  if (userPermissions.length === 0) {
    return false;
  }

  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};

// Function to clear the permission cache
export const clearPermissionCache = () => {
  cachedPermissions = null;
};