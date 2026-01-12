import React from 'react';

const FloralDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex justify-center items-center my-6 opacity-60 ${className}`}>
      <svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10C20 10 25 0 50 0C75 0 80 10 100 10" stroke="#78909C" strokeWidth="1" />
        <path d="M0 10C20 10 25 20 50 20C75 20 80 10 100 10" stroke="#64B5F6" strokeWidth="1" />
        <circle cx="50" cy="10" r="3" fill="#1E3A8A" />
      </svg>
    </div>
  );
};

export default FloralDivider;