// CardRouteWrapper.tsx
import { useParams } from 'react-router-dom';
import { CardProvider } from '../context/CardContext';
import CardPage from '../pages/CardPage';

export default function CardRouteWrapper() {
  const { uid } = useParams();

  if (!uid) return <p className='text-white'>Tarjeta no encontrada</p>;

  return (
    <CardProvider uid={uid}>
      <CardPage />
    </CardProvider>
  );
}
