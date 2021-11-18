import {useParams} from 'react-router-dom';
import {
  PlasmicClientComponent,
  PlasmicClientRoot,
} from '../../../components/PlasmicClientComponent.client';
import {usePlasmicData} from '../../../hooks/usePlasmicData';

export default function CollectionPage() {
  const {handle} = useParams();
  const {data: plasmicData} = usePlasmicData([`/collection`]);

  return (
    <PlasmicClientRoot data={plasmicData}>
      <PlasmicClientComponent
        component={plasmicData.entryCompMetas[0].name}
        componentProps={{
          collectionLoader: {
            collectionHandle: handle,
          },
        }}
      />
    </PlasmicClientRoot>
  );
}
