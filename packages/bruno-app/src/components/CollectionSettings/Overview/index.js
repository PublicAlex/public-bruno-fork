import StyledWrapper from './StyledWrapper';
import Docs from '../Docs';
import Info from './Info';
import { IconBox } from '@tabler/icons';
import RequestsNotLoaded from './RequestsNotLoaded';

const Overview = ({ collection }) => {
  return (
    <StyledWrapper className="h-full">
      <div className="grid grid-cols-5 gap-5 h-full">
        <div className="col-span-2">
          <div className="overview-title-row text-lg font-medium">
            <span className="overview-title-iconbox" aria-hidden="true">
              <IconBox size={22} stroke={2} />
            </span>
            <span>{collection?.name}</span>
          </div>
          <Info collection={collection} />
          <RequestsNotLoaded collection={collection} />
        </div>
        <div className="col-span-3">
          <Docs collection={collection} />
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Overview;
