import styled, { css } from 'styled-components';
import { rgba } from 'polished';

/**
 * Resolves status tokens from the theme.
 *
 * Each status (info, success, warning, danger) provides three tokens:
 *   - background: light tinted color (15% opacity of intent)
 *   - text: full-intensity intent color
 *   - border: full-intensity intent color (same as text)
 *
 * The 'muted' status falls back to surface/muted colors for neutral badges.
 *
 * @see packages/bruno-app/src/themes/schema/oss.js — status schema
 * @see packages/bruno-app/src/themes/light/light.js — light theme tokens
 */
const getStatusTokens = (theme, status) => {
  switch (status) {
    case 'danger':
      return { background: theme.status.danger.background, text: theme.status.danger.text, border: theme.status.danger.border };
    case 'warning':
      return { background: theme.status.warning.background, text: theme.status.warning.text, border: theme.status.warning.border };
    case 'info':
      return { background: theme.status.info.background, text: theme.status.info.text, border: theme.status.info.border };
    case 'success':
      return { background: theme.status.success.background, text: theme.status.success.text, border: theme.status.success.border };
    case 'muted':
    default:
      return { background: theme.background.surface1, text: theme.colors.text.muted, border: theme.border.border1 };
  }
};

/**
 * Variant styles — follows the same pattern as Button (ui/Button/StyledWrapper.js).
 *
 * - light:       tinted background + colored text (default, most common in codebase)
 * - filled:      solid colored background + contrast text
 * - outline:     transparent background + colored border + colored text
 * - ghost:       no background or border, just colored text
 */
const getVariantStyles = (props) => {
  const { theme, $variant, $status } = props;
  const tokens = getStatusTokens(theme, $status);

  switch ($variant) {
    case 'filled':
      return css`
        background: ${tokens.text};
        color: ${tokens.background};
        border: 1px solid ${tokens.text};
      `;
    case 'outline':
      return css`
        background: transparent;
        color: ${tokens.text};
        border: 1px solid ${tokens.border};
      `;
    case 'ghost':
      return css`
        background: transparent;
        color: ${tokens.text};
        border: 1px solid transparent;
      `;
    case 'light':
    default:
      return css`
        background: ${tokens.background};
        color: ${tokens.text};
        border: 1px solid ${tokens.border};
      `;
  }
};

const statusGlow = (status) => {
  switch (status) {
    case 'success':
      return 'rgba(52, 211, 153, 0.22)';
    case 'info':
      return 'rgba(56, 189, 248, 0.2)';
    case 'warning':
      return 'rgba(234, 179, 8, 0.22)';
    case 'danger':
      return 'rgba(244, 114, 133, 0.22)';
    default:
      return 'transparent';
  }
};

/** Vidrio + halo muy suave (pills en Git, sidebar, OpenAPI, etc.) */
const neonSurface = (props) => {
  const { $status, $variant } = props;
  const variant = $variant || 'light';

  if (variant === 'ghost') {
    return '';
  }

  if ($status === 'muted') {
    if (variant === 'light' || variant === 'outline') {
      const soft
        = props.theme.mode === 'dark'
          ? rgba(148, 132, 188, 0.2)
          : rgba(124, 58, 237, 0.16);
      const inset = props.theme.mode === 'dark' ? rgba(255, 255, 255, 0.08) : rgba(255, 255, 255, 0.4);
      return css`
        backdrop-filter: blur(8px) saturate(1.12);
        -webkit-backdrop-filter: blur(8px) saturate(1.12);
        box-shadow:
          inset 0 1px 0 ${inset},
          0 0 10px -4px ${soft};
      `;
    }
    return '';
  }

  const glow = statusGlow($status);
  if (!glow || glow === 'transparent') {
    return '';
  }

  if (variant === 'light' || variant === 'outline') {
    return css`
      backdrop-filter: blur(8px) saturate(1.15);
      -webkit-backdrop-filter: blur(8px) saturate(1.15);
      box-shadow:
        inset 0 1px 0 ${rgba(255, 255, 255, 0.12)},
        0 0 12px -6px ${glow};
    `;
  }

  if (variant === 'filled') {
    return css`
      box-shadow:
        inset 0 1px 0 ${rgba(255, 255, 255, 0.18)},
        0 0 10px -5px ${glow};
    `;
  }

  return '';
};

/**
 * Resolves border-radius from theme keys or raw CSS values.
 *
 * Accepts theme radius keys (sm, base, md, lg, xl), the 'full' alias for pill
 * shapes (9999px), or any raw CSS value (e.g. '20px').
 * Defaults to theme.border.radius.sm when no radius is specified.
 *
 * @see packages/bruno-app/src/themes/light/light.js — radius: { sm: '4px', base: '6px', md: '8px', lg: '10px', xl: '12px' }
 */
const resolveRadius = (props) => {
  const { theme, $radius } = props;
  if (!$radius) return theme.border.radius.sm;
  if ($radius === 'full') return '9999px';
  if (theme.border.radius[$radius]) return theme.border.radius[$radius];
  return $radius;
};

/**
 * Size presets — derived from existing badge patterns in the codebase.
 *
 * - xs: 9px font, minimal padding (inline labels, tab badges)
 * - sm: 10px font, compact padding (matches .conflict-badge, .source-tag, .required-badge)
 * - md: theme xs font, wider padding (matches .deprecated-tag, .changes-tag, .context-pill)
 */
const sizeStyles = {
  xs: css`
    font-size: 9px;
    padding: 0.0625rem 0.25rem;
  `,
  sm: css`
    font-size: 10px;
    padding: 0.125rem 0.375rem;
  `,
  md: css`
    font-size: ${(props) => props.theme.font.size.xs};
    padding: 0.125rem 0.5rem;
  `
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  gap: 3px;
  font-weight: 600;
  white-space: nowrap;
  cursor: default;
  border-radius: ${resolveRadius};
  ${(props) => sizeStyles[props.$size] || sizeStyles.sm}
  ${(props) => getVariantStyles(props)}
  ${(props) => neonSurface(props)}
`;

export default StyledWrapper;
