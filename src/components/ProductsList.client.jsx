import {repeatedElement} from '@plasmicapp/host';
import {ProductProvider, flattenConnection} from '@shopify/hydrogen/client';
import {useProducts} from '../hooks/data-contexts.client';

/**
 * Reads the Products from the current context, and repeatedly renders
 * children for each product, wrapped in a ProductProvider.
 */
export function ProductRepeater({children, count}) {
  let products = useProducts() ?? [];
  if (count != null) {
    products = products.slice(0, count);
  }
  return (
    <>
      {products.map((product, i) => (
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
