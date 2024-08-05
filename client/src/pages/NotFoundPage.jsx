import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/index.css'; // Asegúrate de importar tu archivo CSS aquí

const NotFoundPage = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white">
			<h1 className="mt-2 text-gradient text-3xl  tracking-wider font-lifeCraft">Pagina no encontrada</h1>
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="radial-gradient rounded-full size-96"></div>
        </div>
        <Link to="/" className="relative z-10 size-96 cursor-pointer block" style={{ textDecoration: 'none' }}>
          <img 
            src="../public/notFound.png" 
            alt="Not Found"
            className="size-96 object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>
      <p className="mt-2 text-gradient text-2xl tracking-wider font-lifeCraft">toca el orco para volver</p>
      
    </main>
  );
};

export default NotFoundPage;
