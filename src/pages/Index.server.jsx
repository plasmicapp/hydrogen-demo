import {
  PlasmicClientComponent,
  PlasmicClientRoot
} from '../components/PlasmicClientComponent.client';
import { CollectionProvider } from '../hooks/data-contexts.client';
import { useCollectionData } from '../hooks/queries';
import { usePlasmicData } from '../hooks/usePlasmicData';
import { PLASMIC_PAGE_CACHE_CONFIG } from '../plasmic-init';

/**
 * The /plasmic/home page
 */
export default function HomePage({response}) {
  // Fetch designs from Plasmic
  const {data: plasmicData} = usePlasmicData([`HomePage`]);

  // Fetch the featured collection, which is used by the home page component
  const {data: collectionData} = useCollectionData({handle: "freestyle-collection", count: 4});

  response.cache(PLASMIC_PAGE_CACHE_CONFIG);
  return (
    <PlasmicClientRoot data={plasmicData}>
      <CollectionProvider collection={collectionData.collection}>
        <PlasmicClientComponent component={`HomePage`} />
      </CollectionProvider>
    </PlasmicClientRoot>
  );
}
