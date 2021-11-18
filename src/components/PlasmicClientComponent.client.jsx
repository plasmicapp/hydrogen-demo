import {PlasmicComponent, PlasmicRootProvider} from '@plasmicapp/loader-react';
import {QueryProvider} from '@shopify/hydrogen/client';
import {PLASMIC} from '../plasmic-init';

export function PlasmicClientRoot({data, children}) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={data}>
      <QueryProvider>{children}</QueryProvider>
    </PlasmicRootProvider>
  );
}

export const PlasmicClientComponent = PlasmicComponent;
