import {useQuery} from '@shopify/hydrogen';
import {PLASMIC, PLASMIC_PAGE_CACHE_CONFIG} from '../plasmic-init';

/**
 * Fetches Plasmic component data for `specs`
 */
export function usePlasmicData(specs) {
  return useQuery(
    `usePlasmicData-${JSON.stringify(specs)}`,
    async () => PLASMIC.fetchComponentData(...specs),
    {
      cache: PLASMIC_PAGE_CACHE_CONFIG
    },
  );
}

export function useMaybePlasmicData(specs) {
  return useQuery(
    `useMaybePlasmicData-${JSON.stringify(specs)}`,
    async () => PLASMIC.maybeFetchComponentData(...specs),
    {
      cache: PLASMIC_PAGE_CACHE_CONFIG
    },
  );
}
