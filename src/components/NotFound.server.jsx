import { CollectionProvider } from "../hooks/data-contexts.client";
import { useCollectionData } from "../hooks/queries";
import { usePlasmicData } from "../hooks/usePlasmicData";
import { PlasmicClientComponent, PlasmicClientRoot } from "./PlasmicClientComponent.client";

export default function NotFound() {
  // Fetch the designs from Plasmic
  const {data: plasmicData} = usePlasmicData([`NotFoundPage`]);
  // Fetch Collection data from Shopify
  const {data: collectionData} = useCollectionData({
    handle: "freestyle-collection", count: 6, country: "US"
  });

  return (
    <PlasmicClientRoot data={plasmicData}>
      <CollectionProvider collection={collectionData.collection}>
        <PlasmicClientComponent component={"NotFoundPage"} />
      </CollectionProvider>
    </PlasmicClientRoot>
  );
}
