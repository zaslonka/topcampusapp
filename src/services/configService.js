const getBasePath = () => {
  // Get the first part of the path which is our application base
  const pathname = window.location.pathname;
  const firstPath = pathname.split("/")[1]; // This will be 'CampusBigApp'

  // Return the base application path
  return "/" + firstPath;
};

// New function to get basename for router
export const getRouterBasename = () => {
  const fullPath = getBasePath();
  // Remove any trailing slashes
  return fullPath.replace(/\/$/, "");
};

export const loadConfig = async () => {
  try {
    // Get the base path
    const basePath = getBasePath();

    // Try to find config relative to the current path
    let response = await fetch(`${basePath}/config/uiConfig.json`);

    // If that fails, try to find it relative to the root
    if (!response.ok) {
      const configPath = window.location.pathname.split("/")[1];
      response = await fetch(`/${configPath}/config/uiConfig.json`);
    }

    if (!response.ok) {
      throw new Error("Failed to load configuration");
    }

    return await response.json();
  } catch (error) {
    console.error("Error loading configuration:", error);
    return null;
  }
};
