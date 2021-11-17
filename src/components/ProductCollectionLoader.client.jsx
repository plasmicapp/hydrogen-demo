import { flattenConnection, 
  MediaFileFragment,
  ProductProviderFragment, } from "@shopify/hydrogen/client";
import gql from 'graphql-tag';
import { CollectionContext, ProductsContext } from "../hooks/data-contexts.client";
import { useClientShopQuery } from "../hooks/useClientShopQuery.client";

export function ProductCollectionLoader({
  collectionHandle, count, className, children
}) {
  const {data} = useClientShopQuery({
    query: QUERY,
    variables: {
      handle: collectionHandle,
      country: "US",
      numProducts: count
    }
  });
  const products = flattenConnection(data.collection.products);
  return (
    <CollectionContext.Provider value={data.collection}>
      <ProductsContext.Provider value={products}>
        {children}
      </ProductsContext.Provider>
    </CollectionContext.Provider>
  );
}

const QUERY = gql`
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
