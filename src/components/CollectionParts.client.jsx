import { useCollection } from "../hooks/data-contexts.client";

export function CollectionTitle({className}) {
  const collection = useCollection();
  return <div className={className}>{collection?.title ?? "Collection"}</div>;
}

export function CollectionDescription({className}) {
  const collection = useCollection();
  return <div className={className} dangerouslySetInnerHTML={{__html: collection?.descriptionHtml ?? "Description"}} />
}