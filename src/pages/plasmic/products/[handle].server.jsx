import {useParams} from 'react-router-dom';
import { usePlasmicData } from '../../../hooks/usePlasmicData';
import { PlasmicClientComponent, PlasmicClientRoot } from '../../../components/PlasmicClientComponent.client';

export default function ProductPage() {
  const {handle} = useParams();
  const {data: plasmicData} = usePlasmicData([`/product`]);

  return (
    <PlasmicClientRoot data={plasmicData}>
      <PlasmicClientComponent 
        component={plasmicData.entryCompMetas[0].name} 
        componentProps={{
          productLoader: {
            productHandle: handle
          }
        }}
      />
    </PlasmicClientRoot>
  );
}
