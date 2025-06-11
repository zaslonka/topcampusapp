const getBasePath = () => {
  // Get the application base path by finding CampusTopApp in the path
  const pathname = window.location.pathname;
  console.log("Current pathname:", pathname);
  
  const pathSegments = pathname.split("/").filter(segment => segment !== "");
  console.log("Path segments:", pathSegments);
  
  // Look for CampusTopApp in the path segments
  const appIndex = pathSegments.findIndex(segment => 
    segment === "CampusTopApp" || segment === "CampusBigApp"
  );
  
  if (appIndex !== -1) {
    // Build the base path including all segments up to and including the app name
    const basePath = "/" + pathSegments.slice(0, appIndex + 1).join("/");
    console.log("Found app base path:", basePath);
    return basePath;
  }
  
  // Fallback: if we can't find the app name, try the first segment (original behavior)
  const fallbackPath = pathSegments.length > 0 ? "/" + pathSegments[0] : "";
  console.log("Using fallback base path:", fallbackPath);
  return fallbackPath;
};

// New function to get basename for router
export const getRouterBasename = () => {
  const fullPath = getBasePath();
  // Remove any trailing slashes
  return fullPath.replace(/\/$/, "");
};

export const loadConfig = async () => {
  try {
    // Get the base path dynamically
    const basePath = getBasePath();
    console.log("Loading configuration from base path:", basePath);
    
    // Array of potential config paths to try
    const configPaths = [
      `${basePath}/config/uiConfig.json`,  // Primary: /CampusTopApp/config/uiConfig.json
      `/config/uiConfig.json`,             // Fallback 1: Root config
      `./config/uiConfig.json`,            // Fallback 2: Relative config
    ];

    let response = null;
    let lastError = null;

    // Try each path until one succeeds
    for (const configPath of configPaths) {
      try {
        console.log("Trying config path:", configPath);
        response = await fetch(configPath);
        
        if (response.ok) {
          console.log("Successfully loaded config from:", configPath);
          break;
        } else {
          console.warn(`Config fetch failed for ${configPath}: ${response.status} ${response.statusText}`);
          lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (fetchError) {
        console.warn(`Network error fetching ${configPath}:`, fetchError.message);
        lastError = fetchError;
      }
    }

    if (!response || !response.ok) {
      throw new Error(`Failed to load configuration from any path. Last error: ${lastError?.message || 'Unknown error'}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error loading configuration:", error);
    return null;
  }
};
