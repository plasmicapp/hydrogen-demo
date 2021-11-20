import {useParams} from 'react-router-dom';
import {usePlasmicData} from '../../../hooks/usePlasmicData';
import {
  PlasmicClientComponent,
  PlasmicClientRoot,
} from '../../../components/PlasmicClientComponent.client';
import { useProductDetailsData } from '../../../hooks/queries';
import { flattenConnection, ProductProvider } from '@shopify/hydrogen';

export default function ProductPage() {
  const {handle} = useParams();

  // Fetch the design from Plasmic
  const {data: plasmicData} = usePlasmicData([`/product`]);

  // Fetch the product details from Shopify
  const {data: productData} = useProductDetailsData({handle, country: "US"});
  const product = productData.product;
  return (
    <PlasmicClientRoot data={plasmicData}>
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
