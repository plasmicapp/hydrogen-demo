import { PlasmicCanvasContext } from '@plasmicapp/host';
import { useServerState } from '@shopify/hydrogen/client';
import React from "react";

/**
 * TODO: The goal of this component was to use setServerState() to ask
 * the PlasmicHostPage for some data. But we were seeing incorrect responses
 * when simultaneous requests are made :-/
 */
export function ProductCollectionLoader({
  collectionHandle,
  count,
  children,
}) {
  return children;

  const inEditor = React.useContext(PlasmicCanvasContext);
  const {setServerState, serverState} = useServerState();

  React.useEffect(() => {
    if (!inEditor) {
      // If we are not in a Plasmic artboard, then we are being used For Realz
      // in a production page.  This component is a no-op; the real data 
      // to load is determined by the page component.
      return;
    }

    // Otherwise, if we are in a Plasmic artboard, then we setServerState() to
    // tell the PlasmicHostPage what data we need.
    const opts = {handle: collectionHandle, count};
    if (serverState.dataType !== "collection" || JSON.stringify(serverState.dataOpts) !== JSON.stringify(opts)) {
      setServerState({dataType: "collection", dataOpts: {count, handle: collectionHandle}});
    }
  }, [inEditor, setServerState, collectionHandle, count, serverState]);
  
  return children;
}

