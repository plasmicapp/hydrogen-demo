import {repeatedElement} from '@plasmicapp/host';
import {ProductProvider, flattenConnection} from '@shopify/hydrogen/client';
import {useProducts} from '../hooks/data-contexts.client';

export function ProductsList({children}) {
  const products = useProducts();

  return (
    <>
      {(products ?? []).map((product, i) => (
        <ProductProvider
          key={product.handle}
          product={product}
          initialVariantId={flattenConnection(product.variants)[0]?.id}
        >
          {repeatedElement(i === 0, children)}
        </ProductProvider>
      ))}
    </>
  );
}
