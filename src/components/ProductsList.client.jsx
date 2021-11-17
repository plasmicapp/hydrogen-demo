import { repeatedElement } from "@plasmicapp/host";
import { ProductProvider } from "@shopify/hydrogen";
import { useProducts } from "../hooks/data-contexts.client";

export function ProductsList({ children }) {
  const products = useProducts();

  return (
    <>
      {(products ?? []).map((product, i) => (
        <ProductProvider product={product}>
          {repeatedElement(i === 0, children)}
        </ProductProvider>
      ))}
    </>
  );
}