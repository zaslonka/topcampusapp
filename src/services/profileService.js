// /src/services/profileService.js
export const getUserProfile = async (userId, certificate, config) => {
    const url = config.apiConfig.profileUrl.replace('${userId}', userId);
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "SabaCertificate": certificate,
        "Accept": "application/json"
      }
    });

    //const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch profile");
    return await res.json();
  };
  