import React, { Suspense, lazy } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { useConfig } from '../context/ConfigContext';

const InfoCard = () => {
  const config = useConfig();
  const s = config.infoCard;
  const card = config.catalogCard;

  const getReferrerBaseUrl = () => {
    try {
      const referrerUrl = new URL(document.referrer);
      return `${referrerUrl.protocol}//${referrerUrl.host}`;
    } catch (error) {
      console.warn("Referrer not available or invalid. Using hosted origin.");
      return window.location.origin;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const url = card.isFullUrl ? card.link : `${getReferrerBaseUrl()}${card.link}`;
    if (card.target === "_self") {
      window.top.location.href = url;
    } else if (card.target === "_blank") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const loadIcon = (iconName) => {
    try {
      const IconComponent = lazy(() => 
        import('react-icons/fi').then(module => ({ 
          default: module[iconName] 
        }))
      );
      return <IconComponent style={s.icon} />;
    } catch (error) {
      console.warn(`Icon ${iconName} not found, using fallback icon.`);
      return <FiHelpCircle style={s.icon} />;
    }
  };

  return (
    <div style={s.card}>
      <Suspense fallback={<FiHelpCircle style={s.icon} />}>
        {loadIcon(card.icon)}
      </Suspense>
      <a href="#" onClick={handleClick} style={s.title}>
        {card.title}
      </a>
      <p style={s.text}>
        {card.text}
      </p>
    </div>
  );
};

export default InfoCard;