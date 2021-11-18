import {
  flattenConnection,
  ProductProvider,
  ProductProviderFragment,
} from '@shopify/hydrogen/client';
import {useClientShopQuery} from '../hooks/useClientShopQuery.client';
import gql from 'graphql-tag';

export function ProductDetailsLoader({productHandle, children}) {
  const {data} = useClientShopQuery({
    query: QUERY,
    variables: {
      handle: productHandle,
      country: 'US',
    },
  });
  console.log('PRODUCT DATA', data);
  const product = data.product;
  return (
    <ProductProvider
      product={product}
      initialVariantId={flattenConnection(product.variants)[0]?.id}
    >
      {children}
    </ProductProvider>
  );
}

const QUERY = gql`
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
