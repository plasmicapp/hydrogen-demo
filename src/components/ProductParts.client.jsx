import { useProduct, Image } from "@shopify/hydrogen";

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
    <div className={className}>{cents}</div>
  );
}

export function ProductDescription({className}) {
  const product = useProduct();
  return (
    <div className={className} dangerouslySetInnerHTML={{__html: product?.descriptionHtml ?? "Description"}} />
  );
}

function getPriceFloat(product) {
  const variant = product?.variants?.[0];
  if (!variant || !variant.priceV2) {
    return undefined;
  }
  return parseFloat(variant.priceV2.amount);
}

export function ProductImage({className}) {
  const product = useProduct();
  const variant = product?.variants?.[0];
  if (!product || !variant || !variant.image) {
    return <img className={className} />;
  }

  return <Image className={className} image={variant.image} />
}