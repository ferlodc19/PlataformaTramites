import React, { useState } from 'react';
import ModalFolio from './ModalFolio';

export default function FormularioTramite() {
  const [archivos, setArchivos] = useState({ pdf: null, txt: null });
  const [folio, setFolio] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, tipo: 'pdf' | 'txt') => {
    if (e.target.files && e.target.files.length > 0) {
      setArchivos({ ...archivos, [tipo]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Recolectar los datos del formulario
    const formData = new FormData();
    const target = e.target as typeof e.target & {
      nombre: { value: string };
      ingreso: { value: string };
      estado: { value: string };
    };

    formData.append('Nombre', target.nombre.value);
    formData.append('IngresoMensual', target.ingreso.value);
    formData.append('Estado', target.estado.value);
    
    if (archivos.pdf) formData.append('ArchivoPdf', archivos.pdf);
    if (archivos.txt) formData.append('ArchivoTxt', archivos.txt);

    try {
      // 2. Enviar los datos al backend de .NET
      const response = await fetch('http://localhost:5058/api/tramites', {
        method: 'POST',
        body: formData,
    });;

      if (response.ok) {
        const data = await response.json();
        // 3. Mostrar el modal con el folio real generado por el backend
        setFolio(data.folio); 
      } else {
        alert("Hubo un error al procesar el trámite.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white border-2 border-gray-800 rounded-none shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Registro de Datos</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Datos Biodemográficos */}
        <div>
          <label className="block font-semibold">Nombre Completo</label>
          <input type="text" name="nombre" className="w-full border-2 border-gray-300 rounded-none p-2 focus:border-[#6EE600] outline-none" required />
        </div>

        {/* Datos Económicos y Geográficos */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Ingreso Mensual</label>
            <input type="number" name="ingreso" className="w-full border-2 border-gray-300 rounded-none p-2 focus:border-[#6EE600] outline-none" required />
          </div>
          <div>
            <label className="block font-semibold">Estado</label>
            <input type="text" name="estado" className="w-full border-2 border-gray-300 rounded-none p-2 focus:border-[#6EE600] outline-none" required />
          </div>
        </div>

        {/* Carga de Documentos con validación visual */}
        <div className="mt-6 p-4 border-2 border-gray-200 rounded-none">
          <h3 className="font-bold mb-4">Carga de Documentos</h3>
          
          <div className="flex items-center mb-4">
            <label className="w-32 font-semibold">Archivo PDF:</label>
            <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'pdf')} className="flex-1 border-2 border-gray-300 rounded-none p-1" required />
            {archivos.pdf && <span className="ml-3 text-xl text-[#6EE600]">✔</span>}
          </div>

          <div className="flex items-center">
            <label className="w-32 font-semibold">Archivo TXT:</label>
            <input type="file" accept=".txt" onChange={(e) => handleFileChange(e, 'txt')} className="flex-1 border-2 border-gray-300 rounded-none p-1" required />
            {archivos.txt && <span className="ml-3 text-xl text-[#6EE600]">✔</span>}
          </div>
        </div>

        <button type="submit" className="w-full bg-[#6EE600] text-gray-900 font-bold py-3 mt-6 border-2 border-transparent hover:border-gray-900 transition-colors">
          Enviar Datos
        </button>
      </form>

      {/* Modal Emergente */}
      {folio && <ModalFolio folio={folio} onClose={() => setFolio(null)} />}
    </div>
  );
}