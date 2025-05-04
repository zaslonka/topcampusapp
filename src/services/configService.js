export const loadConfig = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/config/uiConfig.json`);
      if (!response.ok) {
        throw new Error('Failed to load configuration');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading configuration:', error);
      return null;
    }
  };