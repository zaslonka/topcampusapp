// /src/components/WelcomeBanner.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../services/profileService";
import { useConfig } from '../context/ConfigContext';
import InfoCard from "./InfoCard";
import Search from "./Search"; 

const WelcomeBanner = () => {
  const { userId, certificate } = useParams();
  const [user, setUser] = useState(null);
  const config = useConfig();

  useEffect(() => {
    if (!userId || !certificate) return;
    getUserProfile(userId, certificate, config)
      .then(setUser)
      .catch(console.error);
  }, [userId, certificate, config]);

  if (!user) return <p>Loading...</p>;

  const s = config.styles;
  const t = config.staticText;

  return (
    <div style={s.container}>
      <div style={s.left}>
        <div style={s.heading}>Hej {user.fname},<br />{t.welcomeText}</div>
        <p>{t.description}</p>
        
          <Search /> 
        
        {user.is_manager && (
          <a href={config.links.myTeam} style={s.link}>
            {t.myTeamLabel}
          </a>
        )}
      </div>
      <div style={s.right}>
        <InfoCard />
      </div>
    </div>
  );
};

export default WelcomeBanner;
