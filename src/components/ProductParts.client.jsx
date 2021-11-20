/**
 * Custom code components for rendering various parts of a Product
 */
import { repeatedElement } from '@plasmicapp/host';
import { MediaFile, useProduct } from '@shopify/hydrogen/client';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ProductMediaProvider, ProductOptionProvider, ProductOptionValueProvider,
  useProductMedia,
  useProductOption,
  useProductOptionValue
} from '../hooks/data-contexts.client';
import { ProseHtml } from './ProseHtml.client';

/**
 * Renders product title
 */
export function ProductTitle({className}) {
  const product = useProduct();
  return <div className={className}>{product?.title ?? 'Product Title'}</div>;
}

/**
 * Renders product price
 */
export function ProductPrice({className, compareAt}) {
  const product = useProduct();
  const price = getPriceFloat(product, compareAt);
  return <div className={className}>{price}</div>;
}

/**
 * Renders dollars part of product price
 */
export function ProductPriceDollars({className, compareAt}) {
  const product = useProduct();
  const price = getPriceFloat(product, compareAt);
  const dollars = price == undefined ? 49 : Math.round(price);
  return <div className={className}>{dollars}</div>;
}


/**
 * Renders cents part of product price
 */
export function ProductPriceCents({className, compareAt}) {
  const product = useProduct();
  const price = getPriceFloat(product, compareAt);

  const cents = price == undefined ? 99 : Math.round((price % 1) * 100);
  return <div className={className}>{`00${cents}`.slice(-2)}</div>;
}


function getPriceFloat(product, compareAt = false) {
  const variant = product?.selectedVariant ?? product?.variants?.[0];
  if (!variant) {
    return undefined;
  }

  const priceV2 = compareAt ? variant.compareAtPriceV2 : variant.priceV2;
  if (!priceV2) {
    return undefined;
  }
  return parseFloat(priceV2.amount);
}

/**
 * Renders the content if product has a compareAt price
 */
export function VisibleIfHasCompareAtPrice({children}) {
  const product = useProduct();
  const variant = product?.selectedVariant ?? product?.variants?.[0];
  if (variant && !!variant.compareAtPriceV2) {
    return children;
  }
  return null;
}

/**
 * Renders product descriptionHtml
 */
export function ProductDescription({className}) {
  const product = useProduct();
  return <ProseHtml className={className} html={product?.descriptionHtml} />;
}

export function ProductLink({className, children}) {
  const product = useProduct();
  return (
    <Link className={className} to={`/plasmic/products/${product?.handle}`}>
      {children}
    </Link>
  );
}

/**
 * Repeatedly renders children once for each product option in the current
 * product, wrapped in the ProductOption context.
 */
export function ProductOptionsProvider({children}) {
  const product = useProduct();
  const options = product?.options ?? [
    {
      name: 'Fake Option',
      values: ['Option1', 'Option2'],
    },
  ];
  return (
    <>
      {options.map((option, i) => (
        <ProductOptionProvider key={option.name} option={option}>
          {repeatedElement(i === 0, children)}
        </ProductOptionProvider>
      ))}
    </>
  );
}

/**
 * Renders contextual product option name
 */
export function ProductOptionName({className}) {
  const option = useProductOption();
  return <div className={className}>{option?.name ?? 'Option'}</div>;
}

/**
 * Repeatedly renders children once for each product option value in
 * the current context, wrapped in a ProductOptionValue context.
 */
export function ProductOptionValuesProvider({children}) {
  const option = useProductOption();
  const values = option?.values ?? ['Option1', 'Option2'];
  return (
    <>
      {values.map((value, i) => (
        <ProductOptionValueProvider key={value} value={value}>
          {repeatedElement(i === 0, children)}
        </ProductOptionValueProvider>
      ))}
    </>
  );
}

/**
 * Wraps around a toggle button for toggling a specific option value
 */
export function ProductOptionValueCheckboxWrapper({children}) {
  const product = useProduct();
  const selectedOptions = product?.selectedOptions ?? {};
  const option = useProductOption();
  const value = useProductOptionValue() ?? 'Option1';
  if (React.Children.count(children) === 1) {
    return React.cloneElement(React.Children.only(children), {
      children: value,
      isChecked: option ? selectedOptions[option.name] === value : false,
      onChange: () => product?.setSelectedOption?.(option?.name, value),
    });
  } else {
    return children;
  }
}

/**
 * Renders contextual product media
 */
export function ProductMedia({className}) {
  const media = useProductMedia();
  if (!media) {
    return (
      <img
        className={className}
        src="https://cdn.shopify.com/s/files/1/0551/4566/0472/products/hydrogen-morning.jpg"
      />
    );
  }
  return <MediaFile tabIndex="0" media={media} />;
}

/**
 * Provides the primary media for the contextual product
 */
export function PrimaryProductMediaProvider({children}) {
  const primaryMedia = usePrimaryProductMedia();
  return (
    <ProductMediaProvider media={primaryMedia}>
      {children}
    </ProductMediaProvider>
  );
}

function usePrimaryProductMedia() {
  const product = useProduct();
  const allImageMedias = useProductImageMedias();
  if (!product) {
    return undefined;
  }
  if (product.selectedVariant?.image) {
    return {
      mediaContentType: 'IMAGE',
      image: product.selectedVariant.image,
    };
  } else {
    return allImageMedias[0];
  }
}

function useProductImageMedias() {
  const product = useProduct();
  return (product?.media ?? []).filter((m) => !!m.image);
}

function useSecondaryProductMedias() {
  const primaryMedia = usePrimaryProductMedia();
  const allImageMedias = useProductImageMedias();
  return allImageMedias.filter((m) => m.image.id !== primaryMedia?.image?.id);
}

/**
 * Repeatedly renders children for each secondary product media for the
 * contextual product, wrapped in ProductMedia context.
 */
export function SecondaryProductMediaProvider({children}) {
  const secondaryMedia = useSecondaryProductMedias();
  return (
    <>
      {secondaryMedia.map((media, i) => (
        <ProductMediaProvider media={media} key={i}>
          {repeatedElement(i === 0, children)}
        </ProductMediaProvider>
      ))}
    </>
  );
}
