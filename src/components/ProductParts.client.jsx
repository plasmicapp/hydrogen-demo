import { useProduct, Image } from "@shopify/hydrogen/client";
import { ProseHtml } from "./ProseHtml";

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

export function ProductImage({className}) {
  const product = useProduct();
  const variant = product?.variants?.[0];
  if (!product || !variant || !variant.image) {
    return <img className={className} />;
  }

  return <Image className={className} image={variant.image} />
}

export function ProductLink({className, children}) {
  const product = useProduct();
  console.log("YUP1");

  return (
    <Link className={className} to={`/plasmic/products/${product?.handle}`}>{children}</Link>
  );
}

