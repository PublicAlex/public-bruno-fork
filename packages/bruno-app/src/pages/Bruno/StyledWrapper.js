import styled from 'styled-components';
import { rgba } from 'polished';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  border-top: 1px solid ${(props) => props.theme.border?.border1 || props.theme.sidebar.collection.item.hoverBg};
  background: ${(props) =>
    props.theme.mode === 'dark'
      ? `linear-gradient(180deg, ${rgba(255, 255, 255, 0.02)} 0%, transparent 32%), ${props.theme.background.base}`
      : 'transparent'};

  &.is-dragging {
    cursor: col-resize !important;
  }

  section.main {
    display: flex;

    section.request-pane,
    section.response-pane {
      overflow: hidden;
    }
  }

  .fw-600 {
    font-weight: 500;
  }
`;

export default Wrapper;
