import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { useConfig } from '../context/ConfigContext';

const Button = ({ title, subtitle, onClick, variant }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const config = useConfig();
  const s = config.styles.button;

  const buttonStyle = {
    ...s.base,
    ...(variant === 'green' ? s.green : s.white),
    ...(isHovered ? s.hover : {})
  };

  const arrowStyle = {
    ...s.arrowContainer,
    transform: `translateY(-50%) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`,
  };

  return (
    <button 
      style={buttonStyle} 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={s.textContainer}>
        <div style={s.title}>{title}</div>
        <div style={s.subtitle}>{subtitle}</div>
      </div>
      <span style={arrowStyle}>
        <BsChevronRight size={14} />
      </span>
    </button>
  );
};

export default Button;
