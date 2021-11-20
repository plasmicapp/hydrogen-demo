import { PlasmicCanvasHost } from '@plasmicapp/host';
import { PLASMIC } from '../plasmic-init';

/**
 * Wrapper around <PlasmicCanvasHost /> as a client component
 */
export function PlasmicClientCanvasHost() {
  return (
    PLASMIC && <PlasmicCanvasHost />
  );
}
