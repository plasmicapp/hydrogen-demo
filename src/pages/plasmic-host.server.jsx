import { PLASMIC } from "../plasmic-init";
import { PlasmicClientCanvasHost } from "../components/PlasmicClientCanvasHost.client";
import { QueryProvider, ShopifyProvider } from "@shopify/hydrogen";
import shopifyConfig from '../../shopify.config';

export default function PlasmicHost() {
  return PLASMIC && (
    <ShopifyProvider shopifyConfig={shopifyConfig}>
      <script src="https://static1.plasmic.app/preamble.js" />
      <PlasmicClientCanvasHost />
    </ShopifyProvider>
  );
}