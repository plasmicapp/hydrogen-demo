import { PlasmicComponent, PlasmicRootProvider } from '@plasmicapp/loader-react';
import { PLASMIC } from '../plasmic-init';

/**
 * PlasmicRootProvider, re-exported as a client component
 */
export function PlasmicClientRoot({data, children}) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={data}>
      {children}
    </PlasmicRootProvider>
  );
}

/**
 * PlasmicComponent, re-exported as a client component
 */
export const PlasmicClientComponent = PlasmicComponent;
