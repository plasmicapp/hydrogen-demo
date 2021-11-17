import React from "react";

export const ProductsContext = React.createContext();
export function useProducts() {
  return React.useContext(ProductsContext);
}

export const CollectionContext = React.createContext();
export function useCollection() {
  return React.useContext(CollectionContext);
}