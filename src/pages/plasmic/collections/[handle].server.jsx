import { useParams } from 'react-router-dom';
import {
  PlasmicClientComponent,
  PlasmicClientRoot
} from '../../../components/PlasmicClientComponent.client';
import { CollectionProvider } from '../../../hooks/data-contexts.client';
import { useCollectionData } from '../../../hooks/queries';
import { usePlasmicData } from '../../../hooks/usePlasmicData';

export default function CollectionPage() {
  const {handle} = useParams();

  // Fetch the designs from Plasmic
  const {data: plasmicData} = usePlasmicData([`/collection`]);

  // Fetch Collection data from Shopify
  const {data: collectionData} = useCollectionData({handle, count: 6, country: "US"})

  return (
    <PlasmicClientRoot data={plasmicData}>
      <CollectionProvider collection={collectionData.collection}>
        <PlasmicClientComponent
          component={plasmicData.entryCompMetas[0].name}
        />
      </CollectionProvider>
    </PlasmicClientRoot>
  );
}
