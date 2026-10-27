import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormularioTramite from './components/FormularioTramite';
import HistorialFolios from './components/HistorialFolios';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Barra de Navegación */}
        <nav className="bg-gray-900 p-4 border-b-4 border-[#6EE600]">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-white text-xl font-bold tracking-widest">
              SISTEMA DE TRÁMITES
            </h1>
            <div className="flex gap-4">
              <Link 
                to="/" 
                className="text-white font-semibold hover:text-gray-900 hover:bg-[#6EE600] px-4 py-2 border-2 border-transparent transition-colors rounded-none"
              >
                Nuevo Registro
              </Link>
              <Link 
                to="/historial" 
                className="text-white font-semibold hover:text-gray-900 hover:bg-[#6EE600] px-4 py-2 border-2 border-transparent transition-colors rounded-none"
              >
                Historial
              </Link>
            </div>
          </div>
        </nav>

        {/* Contenedor de Rutas */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<FormularioTramite />} />
            <Route path="/historial" element={<HistorialFolios />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;