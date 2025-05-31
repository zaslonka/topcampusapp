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

  const handleCatalogClick = (e) => {
    e.preventDefault();
    const baseUrl = getReferrerBaseUrl();
    window.top.location.href = `${baseUrl}/Saba/Web_spf/EU2TNB0229/app/catalog`;
  };

  const handleInfoClick = (e) => {
    e.preventDefault();
    // Add info page navigation logic here
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

  const styles = {
    container: {
      backgroundImage: 'url("https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '300px',
      minWidth: '466px',
      padding: '40px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.3)'
    },
    contentContainer: {
      maxWidth: '800px',
      color: '#FFFFFF'
    },
    heading: {
      fontSize: '2.5em',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#FFFFFF'
    },
    description: {
      fontSize: '1.1em',
      marginBottom: '30px',
      maxWidth: '600px',
      lineHeight: '1.5',
      color: '#FFFFFF'
    },
    buttonContainer: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        <div style={styles.heading}>
          Hej {fname},<br />
          {t.welcomeText}
        </div>
        <p style={styles.description}>{t.description}</p>
        <div style={styles.buttonContainer}>
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
