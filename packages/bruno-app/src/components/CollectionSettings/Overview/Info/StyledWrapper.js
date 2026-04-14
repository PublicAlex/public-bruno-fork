import styled, { css } from 'styled-components';
import { rgba } from 'polished';

const StyledWrapper = styled.div`
  .overview-info-row {
    padding: 10px 12px;
    margin: 0 -8px;
    border-radius: ${(props) => props.theme.border.radius.lg};
    transition:
      background 0.16s ease,
      box-shadow 0.16s ease;
    border: 1px solid transparent;

    &:hover {
      background: ${(props) => rgba(props.theme.background.surface0, props.theme.mode === 'dark' ? 0.65 : 0.85)};
      border-color: ${(props) => rgba(192, 132, 252, props.theme.mode === 'dark' ? 0.2 : 0.12)};
      box-shadow: 0 0 24px -12px ${rgba(168, 85, 247, 0.25)};
    }
  }

  .icon-box {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${(props) => props.theme.border.radius.md};
    backdrop-filter: blur(16px) saturate(1.5);
    -webkit-backdrop-filter: blur(16px) saturate(1.5);
    transition:
      transform 0.16s ease,
      box-shadow 0.16s ease,
      filter 0.16s ease;

    svg {
      width: 1.375rem;
      height: 1.375rem;
    }

    &:hover {
      transform: scale(1.06);
    }
  }

  ${(props) =>
    props.theme.mode === 'dark'
      ? css`
          .icon-box {
            box-shadow:
              inset 0 1px 0 ${rgba(255, 255, 255, 0.2)},
              0 8px 24px rgba(0, 0, 0, 0.4);
          }

          .icon-box.location {
            background: linear-gradient(142deg, rgba(34, 211, 238, 0.42) 0%, rgba(8, 131, 149, 0.55) 100%);
            border: 1px solid rgba(165, 243, 252, 0.55);
            box-shadow:
              inset 0 1px 0 ${rgba(255, 255, 255, 0.22)},
              0 0 22px -6px rgba(34, 211, 238, 0.55),
              0 8px 22px rgba(0, 0, 0, 0.35);

            svg {
              color: #ecfeff;
              filter: drop-shadow(0 0 6px rgba(103, 232, 249, 0.75));
            }
          }

          .icon-box.environments {
            background: linear-gradient(145deg, rgba(52, 211, 153, 0.45) 0%, rgba(5, 122, 85, 0.55) 100%);
            border: 1px solid rgba(167, 243, 208, 0.5);
            box-shadow:
              inset 0 1px 0 ${rgba(255, 255, 255, 0.2)},
              0 0 22px -6px rgba(52, 211, 153, 0.5),
              0 8px 22px rgba(0, 0, 0, 0.35);

            svg {
              color: #ecfdf5;
              filter: drop-shadow(0 0 6px rgba(110, 231, 183, 0.65));
            }
          }

          .icon-box.requests {
            background: linear-gradient(145deg, rgba(232, 121, 249, 0.42) 0%, rgba(124, 58, 237, 0.52) 100%);
            border: 1px solid rgba(233, 213, 255, 0.45);
            box-shadow:
              inset 0 1px 0 ${rgba(255, 255, 255, 0.2)},
              0 0 24px -6px rgba(192, 132, 252, 0.55),
              0 8px 22px rgba(0, 0, 0, 0.35);

            svg {
              color: #faf5ff;
              filter: drop-shadow(0 0 7px rgba(216, 180, 254, 0.7));
            }
          }

          .icon-box.share {
            background: linear-gradient(145deg, rgba(251, 146, 60, 0.45) 0%, rgba(234, 88, 12, 0.5) 100%);
            border: 1px solid rgba(254, 215, 170, 0.5);
            box-shadow:
              inset 0 1px 0 ${rgba(255, 255, 255, 0.18)},
              0 0 22px -6px rgba(251, 146, 60, 0.48),
              0 8px 22px rgba(0, 0, 0, 0.35);

            svg {
              color: #fff7ed;
              filter: drop-shadow(0 0 6px rgba(253, 186, 116, 0.65));
            }
          }

          .icon-box.generate-docs {
            background: linear-gradient(145deg, rgba(129, 140, 248, 0.48) 0%, rgba(79, 70, 229, 0.52) 100%);
            border: 1px solid rgba(199, 210, 254, 0.48);
            box-shadow:
              inset 0 1px 0 ${rgba(255, 255, 255, 0.2)},
              0 0 22px -6px rgba(129, 140, 248, 0.55),
              0 8px 22px rgba(0, 0, 0, 0.35);

            svg {
              color: #eef2ff;
              filter: drop-shadow(0 0 6px rgba(165, 180, 252, 0.7));
            }
          }
        `
      : css`
          .icon-box.location {
            background: linear-gradient(145deg, ${rgba('#06b6d4', 0.2)} 0%, ${rgba('#0891b2', 0.28)} 100%);
            border: 1px solid ${rgba('#06b6d4', 0.35)};
            svg {
              color: #0e7490;
            }
          }

          .icon-box.environments {
            background: linear-gradient(145deg, ${rgba('#10b981', 0.2)} 0%, ${rgba('#059669', 0.28)} 100%);
            border: 1px solid ${rgba('#10b981', 0.35)};
            svg {
              color: #047857;
            }
          }

          .icon-box.requests {
            background: linear-gradient(145deg, ${rgba('#a855f7', 0.2)} 0%, ${rgba('#7c3aed', 0.28)} 100%);
            border: 1px solid ${rgba('#a855f7', 0.35)};
            svg {
              color: #6d28d9;
            }
          }

          .icon-box.share {
            background: linear-gradient(145deg, ${rgba('#f97316', 0.22)} 0%, ${rgba('#ea580c', 0.28)} 100%);
            border: 1px solid ${rgba('#f97316', 0.38)};
            svg {
              color: #c2410c;
            }
          }

          .icon-box.generate-docs {
            background: linear-gradient(145deg, ${rgba('#6366f1', 0.2)} 0%, ${rgba('#4f46e5', 0.26)} 100%);
            border: 1px solid ${rgba('#6366f1', 0.35)};
            svg {
              color: #4338ca;
            }
          }
        `}
`;

export default StyledWrapper;
