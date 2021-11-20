import { useParams } from 'react-router-dom';
import NotFound from '../../../components/NotFound.server';
import {
  PlasmicClientComponent,
  PlasmicClientRoot
} from '../../../components/PlasmicClientComponent.client';
import { useMaybePlasmicData } from '../../../hooks/usePlasmicData';

/**
 * Catch-all page for /plasmic/*.  Note however that as a catch-all page, we 
 * don't know what data is needed by this page, so we don't know what to fetch...
 */
export default function CatchallPage() {
  const {handle} = useParams();

  // Fetch designs from Plasmic; trying to look for a page named /handle
  // from Plasmic
  const {data: plasmicData} = useMaybePlasmicData([`/${handle}`]);

  if (!plasmicData) {
    return <NotFound />
  }

  return (
    <PlasmicClientRoot data={plasmicData}>
      <PlasmicClientComponent component={plasmicData.entryCompMetas[0].name} />
    </PlasmicClientRoot>
  );
}
