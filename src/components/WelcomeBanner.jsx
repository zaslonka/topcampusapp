// /src/components/WelcomeBanner.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useConfig } from '../context/ConfigContext';
import Button from "./Button";

const WelcomeBanner = () => {
  const { is_manager, fname } = useParams();
  const config = useConfig();

  if (!fname) return <p>Loading...</p>;

  const t = config.staticText;
  const s = config.styles.welcomeBanner;

  const handleCatalogClick = (e) => {
    e.preventDefault();
    const baseUrl = getReferrerBaseUrl();
    window.top.location.href = `${baseUrl}${config.links.catalog}`;
  };

  const handleInfoClick = (e) => {
    e.preventDefault();
    const baseUrl = getReferrerBaseUrl();
    window.top.location.href = `${baseUrl}${config.links.manager}`;
  };

  const getReferrerBaseUrl = () => {
    try {
      const referrerUrl = new URL(document.referrer);
      return `${referrerUrl.protocol}//${referrerUrl.host}`;
    } catch (error) {
      console.warn("Referrer not available or invalid. Using hosted origin.");
      return window.location.origin;
    }
  };

  return (
    <div style={s.container}>
      <div style={s.contentContainer}>
        <div style={s.heading}>
          Hej {fname},<br />
          {t.welcomeText}
        </div>
        <p style={s.description}>{t.description}</p>
        <div style={s.buttonContainer}>
          <Button
            title="Kursuskatalog"
            subtitle="Klik her for at gå til Campus kursuskatalog"
            onClick={handleCatalogClick}
            variant="green"
          />
          {is_manager === 'true' && (
            <Button
              title="Info til ledere"
              subtitle="Få en kort oversigt over mulighederne i Campus"
              onClick={handleInfoClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
