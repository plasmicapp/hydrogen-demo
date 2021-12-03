import {initPlasmicLoader} from '@plasmicapp/loader-react';
import {
  CollectionDescription,
  CollectionTitle,
} from './components/CollectionParts.client';
import NavHeader from './components/NavHeader.client';
import {
  ProductDescription,
  ProductLink,
  ProductMedia,
  ProductMediaRepeater,
  ProductOptionName,
  ProductOptionRepeater,
  ProductOptionValueToggleWrapper,
  ProductOptionValueRepeater,
  ProductPrice,
  ProductPriceCents,
  ProductPriceDollars,
  ProductTitle,
  VisibleIfHasCompareAtPrice,
} from './components/ProductParts.client';
import {ProductRepeater} from './components/ProductsList.client';

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: '411uuq2ERfYjd7WEGqb5iw',
      token:
        '0RQiEsIhvTCAqB8gOHKJ6714OD3DoRlvQWITcHY9dUwJwM9qSnL7oJHjNwrw4uyGTNjs7vyUBhQb9x1BR8DJg',
    },
  ],

  // By default, Plasmic always renders the latest published content.
  // If instead you want to see the latest _unpublished_ content, you
  // can turn on preview here. Note that this is much slower, and should
  // only be used for development not production.
  preview: false,

  // Always fetch a new design so that when cache from useQuery expires,
  // we will re-issue the query instead of using locally-cached content
  alwaysFresh: true,
});

export const PLASMIC_PAGE_CACHE_CONFIG = {
  // Cache the page for 60s
  maxAge: 60,

  // Serve stale page for 24 hours
  staleWhileRevalidate: 24 * 60 * 60
};

PLASMIC.registerComponent(ProductRepeater, {
  name: 'ProductRepeater',
  description: 'Repeats content once per Product in the current collection',
  props: {
    children: 'slot',
    count: {
      type: "number",
      description: "Repeat content for at most this many Products"
    }
  },
});

PLASMIC.registerComponent(ProductTitle, {
  name: 'ProductTitle',
  props: {},
});

PLASMIC.registerComponent(ProductPriceDollars, {
  name: 'ProductPriceDollars',
  props: {
    compareAt: 'boolean',
  },
});

PLASMIC.registerComponent(ProductPriceCents, {
  name: 'ProductPriceCents',
  props: {
    compareAt: 'boolean',
  },
});

PLASMIC.registerComponent(ProductPrice, {
  name: 'ProductPrice',
  props: {
    compareAt: 'boolean',
  },
});

PLASMIC.registerComponent(VisibleIfHasCompareAtPrice, {
  name: 'VisibleIfHasCompareAtPrice',
  description: 'Makes the content visible if the current Product has a "compare at" price',
  props: {
    children: 'slot',
  },
});

PLASMIC.registerComponent(ProductDescription, {
  name: 'ProductDescription',
  description: 'Description for the current Product',
  props: {},
});

PLASMIC.registerComponent(ProductLink, {
  name: 'ProductLink',
  description: 'Creates a Link to the current Product',
  props: {
    children: 'slot',
  },
});

PLASMIC.registerComponent(ProductOptionRepeater, {
  name: 'ProductOptionRepeater',
  description: 'Repeats content once per product option',
  props: {
    children: 'slot',
  },
});

PLASMIC.registerComponent(ProductOptionName, {
  name: 'ProductOptionName',
  props: {},
});

PLASMIC.registerComponent(ProductOptionValueRepeater, {
  name: 'ProductOptionValueRepeater',
  description: 'Repeats content once per product option value',
  props: {
    children: 'slot',
  },
});

PLASMIC.registerComponent(ProductOptionValueToggleWrapper, {
  name: 'ProductOptionValueToggleWrapper',
  description: 'Adds behavior to the wrapped content to activate the current option value',
  props: {
    children: 'slot',
  },
});

PLASMIC.registerComponent(ProductMedia, {
  name: 'ProductMedia',
  description: 'Renders the current product media; defaults to the media of the selected variant, or the first media.',
  props: {},
});

PLASMIC.registerComponent(ProductMediaRepeater, {
  name: 'ProductMediaRepeater',
  description: 'Repeats content for each of current product\'s media',
  props: {
    children: {
      type: "slot",
      description: "Content will be repeated once per product media"
    },
    count: {
      type: "number",
      description: "Max number of product medias to use"
    },
    excludeFeatured: {
      type: "boolean",
      description: "If checked, excludes the featured media, which is the media of the selected product variant, or the first media."
    },
  }
});

PLASMIC.registerComponent(CollectionTitle, {
  name: 'CollectionTitle',
  description: 'Displays the current Collection name',
  props: {},
});

PLASMIC.registerComponent(CollectionDescription, {
  name: 'CollectionDescription',
  description: 'Displays the current Collection description',
  props: {},
});

// Substitute NavHeader with our own version that includes logic for
// opening the mobile menu
PLASMIC.substituteComponent(NavHeader, "NavHeader");
