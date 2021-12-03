import React from "react";
import { PlasmicClientComponent } from "./PlasmicClientComponent.client";

/**
 * This component uses the NavHeader component as designed in Plasmic,
 * but attaches some state and event handlers to enable clicking the
 * mobile menu button to open / close.
 * 
 * TODO: make this aria-accessible!
 */
export default function NavHeader({className}) {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  return (
    <PlasmicClientComponent 
      component="NavHeader"

      // Make sure we get the "original" version of the component and
      // not this substituted version
      forceOriginal={true}

      componentProps={{
        className,

        // Activate mobileMenuOpen variant according to state
        mobileMenuOpen: isMobileMenuOpen,

        // Attach onClick handler to the mobileMenuButton element
        mobileMenuButton: {
          onClick: () => setMobileMenuOpen(!isMobileMenuOpen)
        }
      }}
    />
  );
}