import React from 'react';

import iconSrc from 'assets/rebase-app-icon.png';

/**
 * Marca Rebase: icono de app (PNG) con leve zoom para que se lea mejor en barra de título.
 */
const Bruno = ({ width = 24 }) => {
  const scale = width < 80 ? 1.14 : 1;
  const radius = Math.max(5, Math.round(width * 0.22));

  return (
    <span
      role="img"
      aria-label="Rebase"
      style={{
        width,
        height: width,
        borderRadius: radius,
        overflow: 'hidden',
        display: 'inline-block',
        flexShrink: 0
      }}
    >
      <img
        src={iconSrc}
        alt=""
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          display: 'block',
          userSelect: 'none',
          WebkitUserDrag: 'none'
        }}
      />
    </span>
  );
};

export default Bruno;
