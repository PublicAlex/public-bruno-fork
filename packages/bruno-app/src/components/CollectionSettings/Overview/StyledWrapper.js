import styled, { css } from 'styled-components';
import { rgba } from 'polished';

const StyledWrapper = styled.div`
  .partial {
    color: ${(props) => props.theme.colors.text.yellow};
    opacity: 0.8;
  }

  .loading {
    color: ${(props) => props.theme.colors.text.muted};
    opacity: 0.8;
  }

  .completed {
    color: ${(props) => props.theme.colors.text.green};
    opacity: 0.8;
  }

  .failed {
    color: ${(props) => props.theme.colors.text.danger};
    opacity: 0.8;
  }

  .overview-title-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .overview-title-iconbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 2.75rem;
    border-radius: ${(props) => props.theme.border.radius.md};
    backdrop-filter: blur(14px) saturate(1.45);
    -webkit-backdrop-filter: blur(14px) saturate(1.45);
    transition: transform 0.16s ease, box-shadow 0.16s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  ${(props) =>
    props.theme.mode === 'dark'
      ? css`
          .overview-title-iconbox {
            background: linear-gradient(145deg, rgba(244, 114, 182, 0.38) 0%, rgba(147, 51, 234, 0.48) 55%, rgba(109, 40, 217, 0.52) 100%);
            border: 1px solid rgba(233, 213, 255, 0.45);
            box-shadow:
              inset 0 1px 0 ${rgba(255, 255, 255, 0.22)},
              0 0 26px -8px rgba(236, 72, 153, 0.45),
              0 8px 24px rgba(0, 0, 0, 0.35);

            svg {
              color: #fdf4ff;
              filter: drop-shadow(0 0 6px rgba(244, 114, 182, 0.55));
            }
          }
        `
      : css`
          .overview-title-iconbox {
            background: linear-gradient(145deg, ${rgba('#c026d3', 0.14)} 0%, ${rgba('#7c3aed', 0.2)} 100%);
            border: 1px solid ${rgba('#a855f7', 0.35)};

            svg {
              color: #6d28d9;
            }
          }
        `}
`;

export default StyledWrapper;
