import { css } from 'styled-components';
import { rgba } from 'polished';

function primaryTokens(theme) {
  const p = theme.button2?.color?.primary;
  if (p?.bg && p?.text) {
    return { bg: p.bg, text: p.text, border: p.border || p.bg };
  }
  return { bg: theme.brand, text: theme.bg, border: theme.brand };
}

function dangerTokens(theme) {
  const d = theme.button2?.color?.danger;
  if (d?.bg && d?.text) {
    return { bg: d.bg, text: d.text, border: d.border || d.bg };
  }
  return { bg: '#fb7185', text: '#fff1f2', border: '#fb7185' };
}

/** Botón Guardar / confirmar primario en pies de tabla (vars, dotenv). */
export const neonTablePrimarySubmitStyles = (theme) => {
  const { bg, text, border } = primaryTokens(theme);
  const isDark = theme.mode === 'dark';

  if (isDark) {
    return css`
      .submit {
        padding: 6px 16px;
        font-size: ${theme.font.size.sm};
        border-radius: ${theme.border.radius.base};
        border: 1px solid ${rgba(border, 0.4)};
        background: linear-gradient(
          135deg,
          ${rgba(bg, 0.96)} 0%,
          ${rgba(168, 85, 247, 0.9)} 46%,
          ${rgba(244, 114, 182, 0.88)} 100%
        );
        color: ${text};
        cursor: pointer;
        font-weight: 500;
        box-shadow:
          0 0 18px ${rgba(bg, 0.38)},
          0 0 34px ${rgba(168, 85, 247, 0.15)},
          inset 0 1px 0 ${rgba(255, 255, 255, 0.22)};
        transition: transform 0.14s ease, box-shadow 0.18s ease, filter 0.15s ease;

        &:hover {
          transform: translateY(-1px);
          filter: brightness(1.07);
          box-shadow:
            0 0 26px ${rgba(bg, 0.5)},
            0 0 44px ${rgba(236, 72, 153, 0.18)},
            inset 0 1px 0 ${rgba(255, 255, 255, 0.28)};
        }

        &:active {
          transform: translateY(0) scale(0.98);
        }

        &:focus {
          outline: none;
        }

        &:focus-visible {
          outline: 2px solid ${theme.primary?.solid || theme.brand};
          outline-offset: 2px;
        }

        &:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
          filter: none;
          box-shadow: none;
        }
      }
    `;
  }

  return css`
    .submit {
      padding: 6px 16px;
      font-size: ${theme.font.size.sm};
      border-radius: ${theme.border.radius.base};
      border: 1px solid ${rgba(border, 0.55)};
      background: linear-gradient(135deg, ${rgba(bg, 1)} 0%, ${rgba(147, 51, 234, 0.88)} 100%);
      color: ${text};
      cursor: pointer;
      font-weight: 500;
      box-shadow: 0 2px 12px ${rgba(bg, 0.22)};
      transition: transform 0.14s ease, box-shadow 0.18s ease, filter 0.15s ease;

      &:hover {
        transform: translateY(-1px);
        filter: brightness(1.04);
        box-shadow: 0 4px 18px ${rgba(147, 51, 234, 0.28)};
      }

      &:active {
        transform: translateY(0) scale(0.98);
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: 2px solid ${theme.primary?.solid || theme.brand};
        outline-offset: 2px;
      }

      &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        transform: none;
        filter: none;
        box-shadow: none;
      }
    }
  `;
};

/** Confirmación destructiva en modales (eliminar colección / entorno / dotenv). */
export const neonModalDangerSubmitStyles = (theme) => {
  const { bg, text, border } = dangerTokens(theme);
  const isDark = theme.mode === 'dark';

  const dangerButton = css`
    color: ${text};
    background: linear-gradient(
      135deg,
      ${rgba(251, 113, 133, 0.88)} 0%,
      ${rgba(244, 63, 94, 0.92)} 52%,
      ${rgba(249, 115, 22, 0.45)} 100%
    ) !important;
    border: 1px solid ${rgba(border, 0.45)} !important;
    box-shadow:
      0 0 18px ${rgba(251, 113, 133, 0.38)},
      inset 0 1px 0 ${rgba(255, 255, 255, 0.18)} !important;
    font-weight: 500;
    transition: transform 0.14s ease, box-shadow 0.18s ease, filter 0.15s ease;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      filter: brightness(1.06);
      border-color: ${rgba(border, 0.55)} !important;
      box-shadow:
        0 0 26px ${rgba(251, 113, 133, 0.52)},
        inset 0 1px 0 ${rgba(255, 255, 255, 0.22)} !important;
    }

    &:active:not(:disabled) {
      transform: translateY(0) scale(0.98);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid ${rgba(bg, 0.9)};
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      filter: none;
      box-shadow: none;
    }
  `;

  if (isDark) {
    return css`
      /* Modal: className "submit" va al wrapper del ui/Button */
      .submit button,
      button.submit {
        ${dangerButton}
      }
    `;
  }

  return css`
    .submit button,
    button.submit {
      color: white;
      background: linear-gradient(135deg, ${rgba(bg, 1)} 0%, ${rgba(220, 38, 38, 0.95)} 100%) !important;
      border: 1px solid ${rgba(border, 0.6)} !important;
      box-shadow: 0 2px 12px ${rgba(bg, 0.25)};
      transition: transform 0.14s ease, box-shadow 0.18s ease;

      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 16px ${rgba(bg, 0.35)} !important;
        border: 1px solid ${rgba(border, 0.75)} !important;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    }
  `;
};
