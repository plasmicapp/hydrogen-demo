import {fetchBuilder, graphqlRequestBody} from '@shopify/hydrogen/client';
import shopifyConfig from '../../shopify.config';

const cache = {};

export function useClientShopQuery({query, variables}) {
  const {storeDomain, storefrontToken, graphqlApiVersion} = shopifyConfig;
  const body = graphqlRequestBody(query, variables);

  const key = `${storeDomain}-${graphqlApiVersion}-${body}`;
  if (!(key in cache)) {
    let promise;
    let result;
    cache[key] = () => {
      if (result) {
        return result;
      }
      if (!promise) {
        const url = `https://${storeDomain}/api/${graphqlApiVersion}/graphql.json`;
        const request = new Request(url, {
          method: 'POST',
          headers: {
            'X-Shopify-Storefront-Access-Token': storefrontToken,
            'content-type': 'application/json',
          },
          body,
        });
        promise = fetchBuilder(request)().then((data) => {
          result = data;
        });
        throw promise;
      }
    };
  }
  return cache[key]();
}
