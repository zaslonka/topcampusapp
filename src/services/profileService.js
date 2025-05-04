// /src/services/profileService.js
export const getUserProfile = async (userId, certificate) => {
    const url = `https://kmdsb2-api.sabacloud.com/v1/people/${userId}:(fname,is_manager)`;
    
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
  