import { CardPresentation } from '../components/CardPresentation';
import { useCardContext } from '../context/CardContext';

export default function CardPage() {
  const { cardData, color, loading } = useCardContext();
  if (!cardData) return loading;

  const { name, image, profession, description, links, skills } = cardData;

  return (
    <div
      className='w-full h-[100dvh] justify-center items-center flex overflow-hidden '
      style={{ backgroundImage: `radial-gradient(${color}, #1a1a1a)` }}
    >
      {loading ? (
        <span className='loader'></span>
      ) : (
        <div className='flex flex-col w-full max-h-screen px-4 items-center text-white/60 gap-3 '>
          <CardPresentation
            name={name}
            image={image}
            profession={profession}
            description={description}
            links={links}
            skills={skills}
            withIcon={true}
          />
          <p>
            Hecho en{' '}
            <span className='hover:underline font-bold text-white/80 transition-all duration-200 cursor-pointer font-caveat text-xl'>
              Card.me
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
