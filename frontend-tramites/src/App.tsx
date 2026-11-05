import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import FormularioTramite from './components/FormularioTramite';
import HistorialFolios from './components/HistorialFolios';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 gap-2">
          
          {/* Logotipo y Título (Icono de Edificios y texto completo) */}
          <Link 
            to="/" 
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-[#6EE600] focus-visible:ring-offset-2 rounded-xl shrink-0"
          >
            <div className="bg-green-50 p-2 rounded-xl text-[#6EE600] shrink-0 flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-sm sm:text-base md:text-xl font-bold text-gray-800 tracking-tight whitespace-nowrap">
              Sistema de <span className="text-[#5bc400]">Trámites</span>
            </span>
          </Link>

          {/* Enlaces de Navegación (Solo texto verde al estar activos, sin fondo) */}
          <div className="flex gap-2 md:gap-4 items-center">
            <Link 
              to="/" 
              className={`px-3 md:px-4 py-2 min-h-[44px] flex items-center text-xs md:text-sm font-semibold transition-all whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#6EE600] ${
                location.pathname === '/' 
                  ? 'text-[#5bc400] font-bold' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Nuevo Registro
            </Link>
            
            <Link 
              to="/historial" 
              className={`px-3 md:px-4 py-2 min-h-[44px] flex items-center text-xs md:text-sm font-semibold transition-all whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#6EE600] ${
                location.pathname === '/historial' 
                  ? 'text-[#5bc400] font-bold' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Historial
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<FormularioTramite />} />
          <Route path="/historial" element={<HistorialFolios />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}