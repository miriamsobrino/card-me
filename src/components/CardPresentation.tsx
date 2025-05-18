import { useEffect, useState } from 'react';
import { iconsMap } from './IconsMap';
import { getDomain } from '../helpers/getDomain';
import { RiLink } from 'react-icons/ri';
import { useAuthContext } from '../context/AuthContext';
interface Props {
  name: string;
  image: string;
  profession: string;
  description: string;
  links?: { platform: string; url: string }[];
  skills: string[];
  withIcon?: boolean;
}
export const CardPresentation = ({
  name,
  image,
  profession,
  description,
  links,
  skills,
  withIcon,
}: Props) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showLight, setShowLight] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const button = document.getElementById('share-button');

    if (button && !button.onclick) {
      button.onclick = copyToClipBoard;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect(); // Obtenemos las coordenadas de la tarjeta
    const x = e.clientX - rect.left; // Calculamos la posición X relativa a la tarjeta
    const y = e.clientY - rect.top; // Calculamos la posición Y relativa a la tarjeta

    setCursorPosition({ x, y });
    setShowLight(true);
    // Calcular el efecto de rotación 3D
    const width = rect.width;
    const height = rect.height;

    const rotateY = (x / width - 0.5) * 10;
    const rotateX = (y / height - 0.5) * -10;

    setTransform({
      rotateX,
      rotateY,
    });
  };
  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setShowLight(false);
  };

  useEffect(() => {
    const img = new Image();
    img.src = image;

    if (img.complete) {
      setImageLoading(false);
    } else {
      img.onload = () => setImageLoading(false);
      img.onerror = () => setImageLoading(false);
    }
  }, [image]);

  const copyToClipBoard = () => {
    const cardUrl = `${window.location.origin}/${
      name.toLowerCase().replace(/\s+/g, '-') + '-' + user?.uid.slice(0, 5)
    }`;
    navigator.clipboard
      .writeText(cardUrl)
      .then(() => {
        alert('¡Enlace copiado al portapapeles!');
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles:', err);
      });
  };
  return (
    <>
      {imageLoading ? (
        <span className='loader'></span>
      ) : (
        <div
          className='relative w-full h-[420px] lg:w-[600px] lg:h-[400px] border-2 py-4 lg:py-0 border-gray-100/10 overflow-hidden bg-white/10 rounded-2xl shadow-2xl shadow-black/20'
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: !isMobile
              ? `perspective(600px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`
              : 'none',
            transition: 'transform 0.1s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          {withIcon && (
            <button
              id='share-button'
              onClick={copyToClipBoard}
              className='group flex gap-2  text-white/80  justify-center items-center h-8 absolute right-4 top-2 border-2 hover:bg-white/20 border-gray-200/20 rounded-full p-2 transition-all duration-200 cursor-pointer '
              onMouseEnter={() => setIsIconHovered(true)}
              onMouseLeave={() => setIsIconHovered(false)}
            >
              <span
                className={`whitespace-nowrap transition-all duration-200 pb-1 ${
                  isIconHovered && window.innerWidth > 768
                    ? 'opacity-100 ml-2'
                    : 'opacity-0 ml-[-139px]'
                }`}
              >
                Compartir tarjeta
              </span>
              <div className=''>
                <RiLink />
              </div>
            </button>
          )}

          <div className='w-full h-full lg:px-8 px-2 gap-4 flex flex-col lg:mt-0 items-start justify-between py-2 lg:py-6 text-white/80 text-lg'>
            <div className='flex gap-4 items-center  '>
              {image && (
                <img
                  src={image}
                  className='lg:w-36 lg:h-36 w-28 h-28 object-cover rounded-full border-2 border-gray-200/20 '
                />
              )}

              <div className='flex flex-col gap-2  text-3xl items-start font-extrabold'>
                <span className='text-[22px] lg:text-xl'>{name}</span>
                {profession && (
                  <span className='text-[15px] py-1 lg:py-0  lg:text-base border-2 border-gray-200/20 rounded-full px-4 lg:pb-1  bg-white/30 font-light'>
                    {profession}
                  </span>
                )}

                <div className='flex gap-4 mt-2 items-center'>
                  {links &&
                    links.map((link, index) => {
                      const domain = getDomain(link.url);
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='cursor-pointer opacity-70 hover:scale-[1.05] hover:opacity-100 transition-all duration-200'
                        >
                          {iconsMap[domain] || ''}
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
            <div>
              <p className='text-base  w-full font-light'>{description}</p>
            </div>
            <div>
              {skills && skills.length >= 1 && (
                <div className='flex gap-2 flex-wrap'>
                  {skills
                    .filter((skill) => skill.trim() !== '')
                    .map((skill) => (
                      <span
                        key={skill}
                        className='border-2 border-gray-200/20 rounded-full px-4 pb-1 text-sm bg-white/10 font-light '
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              )}
            </div>
          </div>
          {showLight && window.innerWidth > 768 && (
            <div
              className='absolute pointer-events-none z-50 blur-2xl bg-radial from-gray-200 to-gray-100 opacity-40  mix-blend-lighten rounded-full'
              style={{
                left: `${cursorPosition.x - 60}px`,
                top: `${cursorPosition.y - 60}px`,
                width: '100px',
                height: '100px',
              }}
            />
          )}
        </div>
      )}
    </>
  );
};
