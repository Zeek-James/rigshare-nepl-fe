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

  // If permissions haven't loaded yet, temporarily grant access
  // This prevents blocking initial navigation
  if (userPermissions.length === 0) {
    // console.warn("Permissions not loaded yet - temporarily granting access");
    return true;
  }

  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};

// Function to clear the permission cache
export const clearPermissionCache = () => {
  cachedPermissions = null;
};