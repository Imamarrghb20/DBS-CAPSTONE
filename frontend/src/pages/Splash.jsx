import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarBackground from '../components/StarBackground';

import AliveLogo from '../components/AliveLogo';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Pindah halaman setelah 4.5 detik (logo memantul 3 detik, diam 1.5 detik)
    const navTimer = setTimeout(() => {
      navigate('/welcome');
    }, 4500);

    return () => {
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center relative bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
      <StarBackground />
      <div className="relative flex items-center justify-center z-10 scale-150">
         <div className="animate-intro-bounce">
            <AliveLogo />
         </div>
      </div>
    </div>
  );
}
