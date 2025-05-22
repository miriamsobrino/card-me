import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { logOut } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const signOut = () => {
    logOut();
    navigate('/login');
  };
  return (
    <div
      className={`flex flex-col h-full relative w-full bg-radial from-gray-800 to-gray-900 overflow-x-hidden`}
    >
      <div className='w-full flex-1 flex mx-auto h-full  '>
        <header
          className={`w-full fixed top-0 z-50 ${
            scrolled ? 'bg-white-800/60 backdrop-blur-lg' : ''
          }`}
        >
          <nav className='w-full flex justify-between items-center text-white/80 py-4  px-6 lg:px-40 xl:px-70'>
            {['/', '/login'].includes(location.pathname) && (
              <h1 className='text-4xl font-bold font-caveat'>
                <Link to='/'>Card.me</Link>
              </h1>
            )}

            {location.pathname === '/' && (
              <button
                onClick={signOut}
                className='cursor-pointer flex items-center gap-2'
              >
                Salir
              </button>
            )}
          </nav>
        </header>

        <main className='w-full  '>{children}</main>
      </div>
    </div>
  );
}
