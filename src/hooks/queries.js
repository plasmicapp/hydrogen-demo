import { useShopQuery } from "@shopify/hydrogen";
import gql from 'graphql-tag';
import {
  MediaFileFragment,
  ProductProviderFragment,
} from '@shopify/hydrogen';

export const COLLECTION_QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $numProducts: Int!
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 0
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
    $includeReferenceMetafieldDetails: Boolean = true
  ) @inContext(country: $country) {
    collection(handle: $handle) {
      id
      title
      descriptionHtml

      products(first: $numProducts) {
        edges {
          node {
            vendor
            ...ProductProviderFragment
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }

  ${MediaFileFragment}
  ${ProductProviderFragment}
`;

export function useCollectionData({handle, country="US", count}) {
  return useShopQuery({
    query: COLLECTION_QUERY, 
    variables: {handle, country, numProducts: count},
    cache: { maxAge: 1000 * 3600 * 24 }
  });
}

export const PRODUCT_DETAILS_QUERY = gql`
  query product(
    $country: CountryCode
    $handle: String!
    $numProductMetafields: Int = 20
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
    $includeReferenceMetafieldDetails: Boolean = true
  ) @inContext(country: $country) {
    product: product(handle: $handle) {
      id
      vendor
      seo {
        title
        description
      }
      images(first: 1) {
        edges {
          node {
            url
          }
        }
      }
      ...ProductProviderFragment
    }
  }

  ${ProductProviderFragment}
`;

export function useProductDetailsData({handle, country}) {
  return useShopQuery({
    query: PRODUCT_DETAILS_QUERY, 
    variables: {handle, country},
    cache: { maxAge: 1000 * 3600 * 24 }
  });
}