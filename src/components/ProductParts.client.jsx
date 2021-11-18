import React from "react";
import { repeatedElement } from "@plasmicapp/host";
import { useProduct, Image, MediaFile } from "@shopify/hydrogen/client";
import { ProductMediaContext, ProductOptionContext, ProductOptionValueContext, useProductMedia, useProductOption, useProductOptionValue } from "../hooks/data-contexts.client";
import { ProseHtml } from "./ProseHtml";
import { Link } from "react-router-dom";

export function ProductTitle({className}) {
  const product = useProduct();
  console.log("PRODUCT", product);
  return (
    <div className={className}>{product?.title ?? "Product Title"}</div>
  );
}

export function ProductPrice({className}) {
  const product = useProduct();
  const price = getPriceFloat(product);
  return (
    <div className={className}>{price}</div>
  );
}

export function ProductPriceDollars({className}) {
  const product = useProduct();
  const price = getPriceFloat(product);
  const dollars = price == undefined ? 49 : Math.round(price);
  return (
    <div className={className}>{dollars}</div>
  );
}

export function ProductPriceCents({className}) {
  const product = useProduct();
  const price = getPriceFloat(product);

  const cents = price == undefined ? 99 : Math.round(price % 1 * 100);
  return (
    <div className={className}>{`00${cents}`.slice(-2)}</div>
  );
}

export function ProductDescription({className}) {
  const product = useProduct();
  return (
    <ProseHtml className={className} html={product?.descriptionHtml} />
  );
}

function getPriceFloat(product) {
  const variant = product?.variants?.[0];
  if (!variant || !variant.priceV2) {
    return undefined;
  }
  return parseFloat(variant.priceV2.amount);
}

export function ProductLink({className, children}) {
  const product = useProduct();
  return (
    <Link className={className} to={`/plasmic/products/${product?.handle}`}>{children}</Link>
  );
}

export function ProductOptionsProvider({ children }) {
  const product = useProduct();
  const options = product?.options ?? [{
    name: "Fake Option",
    values: ["Option1", "Option2"]
  }];
  return (
    <>
      {options.map((option, i) => (
        <ProductOptionContext.Provider key={option.name} value={option}>
          {repeatedElement(i === 0, children)}
        </ProductOptionContext.Provider>
      ))}
    </>
  );
}

export function ProductOptionName({className}) {
  const option = useProductOption();
  return <div className={className}>{option?.name ?? "Option"}</div>;
}

export function ProductOptionValuesProvider({children}) {
  const option = useProductOption();
  const values = option?.values ?? ["Option1", "Option2"];
  return (
    <>
      {values.map((value, i) => (
        <ProductOptionValueContext.Provider key={value} value={value}>
          {repeatedElement(i === 0, children)}
        </ProductOptionValueContext.Provider>
      ))}
    </>
  );
}

export function ProductOptionValueCheckboxWrapper({children}) {
  const product = useProduct();
  const selectedOptions = product?.selectedOptions ?? {};
  const option = useProductOption();
  const value = useProductOptionValue() ?? "Option1";
  if (React.Children.count(children) === 1) {
    return React.cloneElement(React.Children.only(children), {
      children: value,
      isChecked: option ? selectedOptions[option.name] === value : false,
      onChange: () => product?.setSelectedOption?.(option?.name, value)
    });
  } else {
    return children;
  }
}

export function ProductMedia({className}) {
  const media = useProductMedia();
  if (!media) {
    return <img className={className} src="https://cdn.shopify.com/s/files/1/0551/4566/0472/products/hydrogen-morning.jpg" />;
  }
  return <MediaFile tabIndex="0" media={media} />;
}

export function PrimaryProductMediaProvider({children}) {
  const product = useProduct();
  const primaryMedia = product?.media?.[0];
  return (
    <ProductMediaContext.Provider value={primaryMedia}>
      {children}
    </ProductMediaContext.Provider>
  );
}

export function SecondaryProductMediaProvider({children}) {
  const product = useProduct();
  const secondaryMedia = (product.media?.slice(1) ?? []).filter(m => !!m.image);
  return (
    <>
      {secondaryMedia.map((media, i) => (
        <ProductMediaContext.Provider value={media} key={i}>
          {repeatedElement(i === 0, children)}
        </ProductMediaContext.Provider>
      ))}
    </>
  );
}

