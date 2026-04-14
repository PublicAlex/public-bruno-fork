import styled from 'styled-components';
import { neonModalDangerSubmitStyles } from 'themes/neonSubmitMixins';

const Wrapper = styled.div`
  ${(props) => neonModalDangerSubmitStyles(props.theme)}
`;

export default Wrapper;
