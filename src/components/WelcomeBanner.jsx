// /src/components/WelcomeBanner.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useConfig } from '../context/ConfigContext';
import Button from "./Button";
import { observeHeightChanges } from '../services/iframeService';

const WelcomeBanner = () => {
  const { is_manager, fname } = useParams();
  const config = useConfig();

  // Set up height observation for iframe communication
  useEffect(() => {
    const cleanup = observeHeightChanges();
    
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      } else if (cleanup && cleanup.disconnect) {
        cleanup.disconnect();
      }
    };
  }, []);

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
          {t.greetingPrefix} {fname},<br />
          {t.welcomeText}
        </div>
        <p style={s.description}>{t.description}</p>
        <div style={s.buttonContainer}>
          <Button
            title={t.buttons.catalog.title}
            subtitle={t.buttons.catalog.subtitle}
            onClick={handleCatalogClick}
            variant="green"
          />
          {is_manager === 'true' && (
            <Button
              title={t.buttons.manager.title}
              subtitle={t.buttons.manager.subtitle}
              onClick={handleInfoClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
