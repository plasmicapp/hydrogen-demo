import {RawHtml} from '@shopify/hydrogen/client';
import "./ProseHtml.css";

/**
 * This component renders HTML from Shopify CMS, but applies some pre-defined
 * styling to it so it looks right.
 */
export function ProseHtml({className, html}) {
  return <RawHtml className={`prose-root ${className}`} string={html} />;
}
