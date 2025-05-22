import { useNavigate } from 'react-router-dom';
import { CardPresentation } from '../components/CardPresentation';
import { useAuthContext } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuthContext();
  const [isMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const signIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  return (
    <div className='w-full min-h-screen pt-40 lg:pt-20 justify-between text-left text-white/60 items-center py-10 lg:py-0 lg:flex lg:flex-row flex-col gap-6 lg:gap-12 px-6  xl:px-30 mx-auto'>
      {loading ? (
        <span className='loader'></span>
      ) : (
        <div className='flex flex-col gap-8 lg:flex-row lg:gap-12 items-center w-full mx-auto justify-center '>
          <motion.div
            initial={isMobile ? { opacity: 0, y: -50 } : { opacity: 0, x: -50 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0, 0.55, 0.45, 1] }}
            className='text-center lg:text-left items-center lg:items-start flex flex-col gap-2 min-w-[400px] '
          >
            <div className='leading-2'>
              <h2 className='text-3xl lg:text-4xl text-white/80 font-bold'>
                Comparte quién eres.
              </h2>
              <h2 className='text-3xl lg:text-4xl text-white/80 font-bold'>
                Conecta de manera fácil y profesional.
              </h2>
            </div>
            <h3 className='text-lg lg:text-xl mt-2'>
              Tu tarjeta de presentación digital en un solo enlace.
            </h3>
            <button
              onClick={signIn}
              className='p-2 text-center cursor-pointer hover:bg-blue-400 text-white pb-3 bg-blue-500 px-4 rounded-md disabled:opacity-30 mt-4 transition-all duration-200'
            >
              Empezar ahora
            </button>
          </motion.div>
          <motion.div
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 30 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: [0, 0.55, 0.45, 1], delay: 0.2 }}
          >
            <CardPresentation
              name='Miriam Sobrino'
              image='/default.webp'
              profession='Frontend Developer'
              portfolio='https://portfolio-miriam.vercel.app'
              description={`Desarrollo interfaces web intuitivas y visualmente atractivas, optimizadas para una experiencia de usuario fluida. Mi pasión es combinar diseño y tecnología para construir productos digitales accesibles e innovadores.`}
              links={[
                { platform: 'github', url: 'https://github.com/miriamsobrino' },
                {
                  platform: 'linkedin',
                  url: 'https://www.linkedin.com/in/miriam-sobrino-5295a5150/',
                },
                {
                  platform: 'instagram',
                  url: 'https://instagram.com/miri.code',
                },
              ]}
              skills={['HTML', 'CSS', 'TypeScript', 'React', 'Astro']}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
