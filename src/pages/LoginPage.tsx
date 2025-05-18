import { useNavigate } from 'react-router-dom';
import { CardPresentation } from '../components/CardPresentation';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
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
    <div className='w-full min-h-screen pt-40 lg:pt-20 justify-between text-left text-white/60 items-center py-10 lg:py-0 lg:flex lg:flex-row flex-col gap-6 lg:gap-12 px-6 lg:px-70'>
      {loading ? (
        <span className='loader'></span>
      ) : (
        <>
          <div className='text-center lg:text-left items-center lg:items-start flex flex-col gap-2 '>
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
          </div>
          <CardPresentation
            name='Miriam Sobrino'
            image='/default.jpg'
            profession='Frontend Developer'
            description='Desarrollo interfaces web intuitivas y visualmente atractivas, optimizadas para una experiencia de usuario fluida. Mi pasión es combinar diseño y tecnología para construir productos digitales accesibles e innovadores.'
            links={[
              { platform: 'github', url: 'https://github.com/miriamsobrino' },
              { platform: 'linkedin', url: 'https://linkedin.com/' },
              { platform: 'instagram', url: 'https://instagram.com/miri.code' },
            ]}
            skills={['HTML', 'CSS', 'TypeScript', 'React', 'Astro']}
          />
        </>
      )}
    </div>
  );
}
