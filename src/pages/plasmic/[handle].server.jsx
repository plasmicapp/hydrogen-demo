import {useParams} from 'react-router-dom';
import NotFound from '../../components/NotFound.server';
import { useMaybePlasmicData } from '../../hooks/usePlasmicData';
import { PlasmicClientComponent, PlasmicClientRoot } from '../../components/PlasmicClientComponent.client';

export default function Page() {
  const {handle} = useParams();
  const {data: plasmicData} = useMaybePlasmicData([`/${handle}`]);

  console.log("HANDLE", handle);
  if (!plasmicData) {
    return <NotFound />;
  }

  return (
    <PlasmicClientRoot data={plasmicData}>
      <PlasmicClientComponent component={plasmicData.entryCompMetas[0].name} />
    </PlasmicClientRoot>
  );
}
