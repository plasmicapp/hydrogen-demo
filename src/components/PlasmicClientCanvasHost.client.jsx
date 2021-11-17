import { PlasmicCanvasHost } from "@plasmicapp/host";
import { QueryProvider } from "@shopify/hydrogen";
import { PLASMIC } from "../plasmic-init";

export function PlasmicClientCanvasHost() {
  return PLASMIC && (
    <QueryProvider>
      <PlasmicCanvasHost />
    </QueryProvider>
  );
}
