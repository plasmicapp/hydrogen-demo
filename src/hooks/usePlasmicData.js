import { useQuery } from "@shopify/hydrogen";
import { PLASMIC } from "../plasmic-init";

export function usePlasmicData(specs) {
  return useQuery(
    `usePlasmicData-${JSON.stringify(specs)}`,
    async () => PLASMIC.fetchComponentData(...specs)
  );
}

export function useMaybePlasmicData(specs) {
  return useQuery(
    `useMaybePlasmicData-${JSON.stringify(specs)}`,
    async () => PLASMIC.maybeFetchComponentData(...specs)
  );
}