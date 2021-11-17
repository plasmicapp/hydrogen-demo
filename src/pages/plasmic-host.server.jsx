import { PLASMIC } from "../plasmic-init";
import { PlasmicClientCanvasHost } from "../components/PlasmicClientCanvasHost.client";
import { QueryProvider, ShopifyProvider } from "@shopify/hydrogen";
import shopifyConfig from '../../shopify.config';
import {Helmet} from "@shopify/hydrogen";

export default function PlasmicHost() {
  return PLASMIC && (
    <ShopifyProvider shopifyConfig={shopifyConfig}>
      <script src="https://static1.plasmic.app/preamble.js" />
      <Helmet>
        <script id="helmet" src="https://static1.plasmic.app/preamble.js" />
      </Helmet>
      <PlasmicClientCanvasHost />
    </ShopifyProvider>
  );
}