import { initPlasmicLoader } from "@plasmicapp/loader-react";
import { CollectionDescription, CollectionTitle } from "./components/CollectionParts.client";
import { ProductCollectionLoader } from "./components/ProductCollectionLoader.client";
import { ProductDetailsLoader } from "./components/ProductDetailsLoader.client";
import { PrimaryProductMediaProvider, ProductDescription, ProductLink, ProductMedia, ProductOptionName, ProductOptionsProvider, ProductOptionValueCheckboxWrapper, ProductOptionValuesProvider, ProductPrice, ProductPriceCents, ProductPriceDollars, ProductTitle, SecondaryProductMediaProvider, VisibleIfHasCompareAtPrice } from "./components/ProductParts.client";
import { ProductsList } from "./components/ProductsList.client";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "38Xy6Etsio2WofKtc3VeyW",
      token: "NNQaUIsOysgvICJrNGLEUq53Jl0SmOE0xy8L2Ti18qnndWpCGnPrCi2vEl89bgBVGt26HlrLi2bZQclOZTA"
    }
  ],
});

PLASMIC.registerComponent(
  ProductsList, {
    name: "ProductsList",
    props: {
      children: "slot"
    }
  }
);

PLASMIC.registerComponent(
  ProductCollectionLoader, {
    name: "ProductCollectionLoader",
    props: {
      collectionHandle: {
        type: "choice",
        options: ["freestyle-collection", "backcountry-collection"],
        defaultValue: "freestyle-collection"
      },
      count: {
        type: "number",
        defaultValue: 6
      },
      children: {
        type: 'slot',
        defaultValue: [
          {
            type: 'component',
            name: 'ProductsList',
          },
        ],
      },
    }
  }
);

PLASMIC.registerComponent(
  ProductDetailsLoader, {
    name: "ProductDetailsLoader",
    props: {
      productHandle: {
        type: "choice",
        options: ["mail-it-in-freestyle-snowboard", "snowboard", "the-full-stack"],
        defaultValue: "snowboard"
      },
      children: "slot"
    }
  }
);

PLASMIC.registerComponent(
  ProductTitle, {
    name: "ProductTitle",
    props: {}
  }
);

PLASMIC.registerComponent(
  ProductPriceDollars, {
    name: "ProductPriceDollars",
    props: {
      compareAt: "boolean"
    }
  }
);

PLASMIC.registerComponent(
  ProductPriceCents, {
    name: "ProductPriceCents",
    props: {
      compareAt: "boolean"
    }
  }
);

PLASMIC.registerComponent(
  ProductPrice, {
    name: "ProductPrice",
    props: {
      compareAt: "boolean"
    }
  }
);

PLASMIC.registerComponent(
  VisibleIfHasCompareAtPrice, {
    name: "VisibleIfHasCompareAtPrice",
    props: {
      children: "slot"
    }
  }
);

PLASMIC.registerComponent(
  ProductDescription, {
    name: "ProductDescription",
    props: {}
  }
);

PLASMIC.registerComponent(
  ProductLink, {
    name: "ProductLink",
    props: {
      children: "slot"
    }
  }
);

PLASMIC.registerComponent(
  ProductOptionsProvider, {
    name: "ProductOptionsProvider",
    props: {
      children: "slot"
    }
  }
);

PLASMIC.registerComponent(
  ProductOptionName, {
    name: "ProductOptionName",
    props: {
    }
  }
);

PLASMIC.registerComponent(
  ProductOptionValuesProvider, {
    name: "ProductOptionValuesProvider",
    props: {
      children: "slot"
    }
  }
);

PLASMIC.registerComponent(
  ProductOptionValueCheckboxWrapper, {
    name: "ProductOptionValueCheckboxWrapper",
    props: {
      children: "slot"
    }
  }
);

PLASMIC.registerComponent(
  ProductMedia, {
    name: "ProductMedia",
    props: {}
  }
);

PLASMIC.registerComponent(
  PrimaryProductMediaProvider, {
    name: "PrimaryProductMediaProvider",
    props: {
      children: "slot"
    }
  }
);

PLASMIC.registerComponent(
  SecondaryProductMediaProvider, {
    name: "SecondaryProductMediaProvider",
    props: {
      children: "slot"
    }
  }
);

PLASMIC.registerComponent(
  CollectionTitle, {
    name: "CollectionTitle",
    props: {}
  }
);

PLASMIC.registerComponent(
  CollectionDescription, {
    name: "CollectionDescription",
    props: {}
  }
);
