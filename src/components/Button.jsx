import React from 'react';
import { BsChevronRight } from 'react-icons/bs';

const Button = ({ title, subtitle, onClick, variant }) => {
  const s = {
    button: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '15px 20px',
      backgroundColor: variant === 'green' ? '#e1ede7' : '#FFFFFF',
      border: '1px solid #E5E5E5',
      borderRadius: '8px',
      cursor: 'pointer',
      width: '260px',
      textAlign: 'left',
      boxSizing: 'border-box',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
      position: 'relative',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.3)',
      },
    },
    textContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      marginRight: '40px',
    },
    title: {
      fontWeight: '600',
      fontSize: '16px',
      color: '#333',
      marginBottom: '6px',
    },
    subtitle: {
      fontSize: '14px',
      color: '#666',
      paddingRight: '20px',
    },
    arrowContainer: {
      position: 'absolute',
      right: '15px',
      top: '65%',
      transform: 'translateY(-50%)',
      width: '24px',
      height: '24px',
      backgroundColor: '#008450',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      transition: 'transform 0.3s ease',
    },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const buttonStyle = {
    ...s.button,
    transform: isHovered ? 'translateY(-2px)' : 'none',
    boxShadow: isHovered 
      ? '0 4px 8px 0 rgba(0, 0, 0, 0.3)' 
      : '0 2px 4px 0 rgba(0, 0, 0, 0.3)'
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
