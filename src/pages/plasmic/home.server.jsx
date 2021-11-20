import {
  PlasmicClientComponent,
  PlasmicClientRoot
} from '../../components/PlasmicClientComponent.client';
import { CollectionProvider } from '../../hooks/data-contexts.client';
import { useCollectionData } from '../../hooks/queries';
import { usePlasmicData } from '../../hooks/usePlasmicData';

/**
 * The /plasmic/home page
 */
export default function HomePage() {
  // Fetch designs from Plasmic
  const {data: plasmicData} = usePlasmicData([`/home`]);

  // Fetch the featured collection, which is used by the home page component
  const {data: collectionData} = useCollectionData({handle: "freestyle-collection", count: 3});

  return (
    <PlasmicClientRoot data={plasmicData}>
      <CollectionProvider collection={collectionData.collection}>
        <PlasmicClientComponent component={`/home`} />
      </CollectionProvider>
    </PlasmicClientRoot>
  );
}
