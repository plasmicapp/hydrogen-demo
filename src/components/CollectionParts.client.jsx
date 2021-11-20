/**
 * Custom code components for rendering parts of a Collection
 */
import {useCollection} from '../hooks/data-contexts.client';
import {ProseHtml} from './ProseHtml.client';

/**
 * Renders contextual collection title
 */
export function CollectionTitle({className}) {
  const collection = useCollection();
  return <div className={className}>{collection?.title ?? 'Collection'}</div>;
}

/**
 * Renders contextual collection description
 */
export function CollectionDescription({className}) {
  const collection = useCollection();
  return <ProseHtml className={className} html={collection?.descriptionHtml ?? "Collection description"} />;
}
