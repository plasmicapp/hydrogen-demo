import React from "react";

export const ProductsContext = React.createContext();
export function useProducts() {
  return React.useContext(ProductsContext);
}

export const CollectionContext = React.createContext();
export function useCollection() {
  return React.useContext(CollectionContext);
}

export const ProductOptionContext = React.createContext();
export function useProductOption() {
  return React.useContext(ProductOptionContext);
}

export const ProductOptionValueContext = React.createContext();
export function useProductOptionValue() {
  return React.useContext(ProductOptionValueContext);
}