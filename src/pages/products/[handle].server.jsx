import {useParams} from 'react-router-dom';
import {usePlasmicData} from '../../hooks/usePlasmicData';
import {
  PlasmicClientComponent,
  PlasmicClientRoot,
} from '../../components/PlasmicClientComponent.client';
import { useProductDetailsData } from '../../hooks/queries';
import { flattenConnection, ProductProvider } from '@shopify/hydrogen';
import { PLASMIC_PAGE_CACHE_CONFIG } from '../../plasmic-init';
import Seo from '../../components/Seo.client';

export default function ProductPage({response}) {
  const {handle} = useParams();

  // Fetch the design from Plasmic
  const {data: plasmicData} = usePlasmicData([`ProductPage`]);

  // Fetch the product details from Shopify
  const {data: productData} = useProductDetailsData({handle, country: "US"});
  const product = productData.product;
  response.cache(PLASMIC_PAGE_CACHE_CONFIG);
  return (
    <PlasmicClientRoot data={plasmicData}>
      <Seo shopName="Snowdevil" product={product} />
      <ProductProvider 
        product={product} 
        initialVariantId={flattenConnection(product.variants)[0]?.id}
      >
        <PlasmicClientComponent
          component={plasmicData.entryCompMetas[0].name}
        />
      </ProductProvider>
    </PlasmicClientRoot>
  );
}
