import { fetchBuilder, graphqlRequestBody, useQuery } from "@shopify/hydrogen";
import shopifyConfig from '../../shopify.config';

export function useClientShopQuery({
  query, variables
}) {
  const {storeDomain, storefrontToken, graphqlApiVersion } = shopifyConfig;
  const body = graphqlRequestBody(query, variables);
  const url = `https://${storeDomain}/api/${graphqlApiVersion}/graphql.json`;
  const request = new Request(url, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontToken,
      'content-type': 'application/json',
    },
    body,
  });

  const {data} = useQuery(
    [storeDomain, graphqlApiVersion, body],
    fetchBuilder(request)
  );

  return data;
}