import {useQuery} from '@shopify/hydrogen';
import {PLASMIC} from '../plasmic-init';

/**
 * Fetches Plasmic component data for `specs`
 */
export function usePlasmicData(specs) {
  return useQuery(
    `usePlasmicData-${JSON.stringify(specs)}`,
    async () => PLASMIC.fetchComponentData(...specs),
    {
      cache: {
        maxAge: 1,
      },
    },
  );
}

export function useMaybePlasmicData(specs) {
  return useQuery(
    `useMaybePlasmicData-${JSON.stringify(specs)}`,
    async () => PLASMIC.maybeFetchComponentData(...specs),
    {
      cache: {
        maxAge: 1,
      },
    },
  );
}
