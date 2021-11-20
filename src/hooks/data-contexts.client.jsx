import { flattenConnection } from '@shopify/hydrogen/client';
import React from 'react';

// We explicitly create *Provider components, instead of
// relying on Context.Provider, because Hydrogen special-cases
// components ending in *Provider to make sure they are
// rendered during hydration.

export const ProductsContext = React.createContext();
export function ProductsProvider({products, children}) {
  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}
export function useProducts() {
  return React.useContext(ProductsContext);
}

export const CollectionContext = React.createContext();
export function CollectionProvider({collection, children}) {
  const products = flattenConnection(collection.products);
  return (
    <CollectionContext.Provider value={collection}>
      <ProductsProvider products={products}>
        {children}
      </ProductsProvider>
    </CollectionContext.Provider>
  );
}
export function useCollection() {
  return React.useContext(CollectionContext);
}

export const ProductOptionContext = React.createContext();
export function ProductOptionProvider({option, children}) {
  return (
    <ProductOptionContext.Provider value={option}>
      {children}
    </ProductOptionContext.Provider>
  );
}
export function useProductOption() {
  return React.useContext(ProductOptionContext);
}

export const ProductOptionValueContext = React.createContext();
export function ProductOptionValueProvider({value, children}) {
  return (
    <ProductOptionValueContext.Provider value={value}>
      {children}
    </ProductOptionValueContext.Provider>
  );
}
export function useProductOptionValue() {
  return React.useContext(ProductOptionValueContext);
}

export const ProductMediaContext = React.createContext();
export function ProductMediaProvider({media, children}) {
  return (
    <ProductMediaContext.Provider value={media}>
      {children}
    </ProductMediaContext.Provider>
  );
}
export function useProductMedia() {
  return React.useContext(ProductMediaContext);
}
