import { RawHtml } from "@shopify/hydrogen";
import sty from "./ProseHtml.module.css";

export function ProseHtml({className, html}) {
  return <RawHtml className={`${sty.root} ${className}`} string={html} />;
}