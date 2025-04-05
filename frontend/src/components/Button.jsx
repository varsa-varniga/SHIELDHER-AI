import React from 'react';
import { useNavigate } from 'react-router-dom';

const CButton = ({ label = 'Attempt Quiz', to = '/cyberquiz' }) => {
  const navigate = useNavigate();

  const buttonStyle = {
    background: 'linear-gradient(45deg, #38BDF8, #818CF8)',
    boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)',
    color: 'white',
    padding: '12px 36px',
    fontSize: '1.2rem',
    textTransform: 'none',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-position 0.5s ease',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    margin: '20px auto',
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    fontStyle: 'italic',
    letterSpacing: '1px',
    backgroundSize: '200% 200%',
    backgroundPosition: 'right center',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 20px rgba(56, 189, 248, 0.7)',
  };


  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      
    >
      {label}
    </button>
  );
};

export default CButton;