import { repeatedElement } from "@plasmicapp/host";
import { flattenConnection, ProductProvider, 
  MediaFileFragment,
  ProductProviderFragment, } from "@shopify/hydrogen";
import gql from 'graphql-tag';
import { CollectionContext, ProductsContext } from "../hooks/data-contexts.client";
import { useClientShopQuery } from "../hooks/useClientShopQuery.client";

export function ProductCollection({
  collectionName, count, className, children
}) {
  const {data} = useClientShopQuery({
    query: QUERY,
    variables: {
      handle: collectionName,
      country: "US",
      numProducts: count
    }
  });
  const products = flattenConnection(data.collection.products);
  return (
    <div className={className}>
      <CollectionContext.Provider value={data.collection}>
        <ProductsContext.Provider value={products}>
          {children}
        </ProductsContext.Provider>
      </CollectionContext.Provider>
    </div>
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
