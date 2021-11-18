import { useCollection } from "../hooks/data-contexts.client";
import { ProseHtml } from "./ProseHtml";

export function CollectionTitle({className}) {
  const collection = useCollection();
  return <div className={className}>{collection?.title ?? "Collection"}</div>;
}

export function CollectionDescription({className}) {
  const collection = useCollection();
  return <ProseHtml className={className} html={collection?.descriptionHtml} />;
}