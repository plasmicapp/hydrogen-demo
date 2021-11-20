import { flattenConnection, ProductProvider } from '@shopify/hydrogen';
import { Suspense } from 'react';
import { PlasmicClientCanvasHost } from '../components/PlasmicClientCanvasHost.client';
import { CollectionProvider } from '../hooks/data-contexts.client';
import { useCollectionData, useProductDetailsData } from '../hooks/queries';
import { PLASMIC } from '../plasmic-init';

/**
 * The Plasmic host page; this is the page that is used to render the artboards
 * inside the Plasmic studio; each artboard is an iframe pointing at this page.  
 * It needs to ultimately render the <PlasmicCanvasHost />, which is where Plasmic 
 * will inject the designs into the React tree.
 * 
 * This page also serves another important purpose -- it provides the Shopify
 * data needed to power some of the designs.  
 * 
 * For now, it just always supplies data for a hard-coded collection and a 
 * hard-coded product.  This is only for the purpose of the host page -- in
 * the "real" page, like /plasmic/product/[handle].server.jsx, the data is fetched
 * there according to the `handle` param.
 * 
 * We had tried to use setServerState() from the client to instruct this page
 * on what data exactly to fetch and provide. Unfortunately there may be some
 * bug (?) such that when simulatneous setServerState() requests are made to
 * the server, the response is missing the client components... 🤔
 */
export default function PlasmicHostPage() {
  const {data: collectionData} = useCollectionData({handle: "freestyle-collection", count: 6, country: "US"});
  const {data: productData} = useProductDetailsData({handle: "snowboard", country: "US"});
  const collection = collectionData.collection;
  const product = productData.product;
  return (
    PLASMIC && (
      <Suspense fallback={<div>Loading...</div>}>
        <script src="https://static1.plasmic.app/preamble.js" />
        <CollectionProvider collection={collection}>
          <ProductProvider product={product} initialVariantId={flattenConnection(product.variants)[0]?.id}>
            <PlasmicClientCanvasHost />
          </ProductProvider>
        </CollectionProvider>
      </Suspense>
    )
  );
}