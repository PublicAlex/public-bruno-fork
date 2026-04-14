import styled, { css } from 'styled-components';
import { rgba } from 'polished';

const StyledWrapper = styled.div`
  div.tabs {
    ${(props) =>
      props.theme.mode === 'dark'
      && css`
        padding: 6px 10px 2px;
        margin-bottom: 6px;
        border-radius: ${props.theme.border.radius.lg};
        background: ${rgba(props.theme.background.surface0, 0.45)};
        border: 1px solid ${props.theme.border.border1};
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow: ${props.theme.shadow.sm};
      `}

    div.tab {
      padding: 6px 0px;
      border: none;
      border-bottom: solid 2px transparent;
      margin-right: ${(props) => props.theme.tabs.marginRight};
      color: ${(props) => props.theme.colors.text.subtext0};
      cursor: pointer;

      &:focus,
      &:active,
      &:focus-within,
      &:focus-visible,
      &:target {
        outline: none !important;
        box-shadow: none !important;
      }

      &:hover {
        color: ${(props) => props.theme.tabs.active.color} !important;
      }

      &.active {
        font-weight: ${(props) => props.theme.tabs.active.fontWeight} !important;
        color: ${(props) => props.theme.tabs.active.color} !important;
        border-bottom: solid 2px ${(props) => props.theme.tabs.active.border} !important;
      }
    }
  }
  table {
    thead,
    td {
      border: 1px solid ${(props) => props.theme.table.border};

      li {
        background-color: ${(props) => props.theme.bg} !important;
      }
    }
  }

  .muted {
    color: ${(props) => props.theme.colors.text.muted};
  }

  input[type='radio'] {
    cursor: pointer;
    accent-color: ${(props) => props.theme.primary.solid};
  }

  /* Iconos en cabeceras y filas de tarjetas (ajustes de colección, Git, etc.) — acento neón */
  ${(props) =>
    props.theme.mode === 'dark'
    && css`
      section .section-card .section-header svg,
      section .hero-card .section-header svg,
      section .hero-card .compact-header svg {
        color: #d8b4fe;
        filter: drop-shadow(0 0 5px ${rgba(168, 85, 247, 0.55)});
      }

      section .section-card .inline-row svg,
      section .section-card .file-row svg,
      section .hero-card .detail-value svg,
      section .history-title svg {
        color: #c4b5fd;
        filter: drop-shadow(0 0 4px ${rgba(139, 92, 246, 0.45)});
      }
    `}

  ${(props) =>
    props.theme.mode === 'light'
    && css`
      section .section-card .section-header svg,
      section .hero-card .section-header svg,
      section .hero-card .compact-header svg {
        color: ${rgba(91, 33, 182, 0.88)};
      }

      section .section-card .inline-row svg,
      section .section-card .file-row svg,
      section .hero-card .detail-value svg {
        color: ${rgba(109, 40, 217, 0.82)};
      }
    `}
`;

export default StyledWrapper;
