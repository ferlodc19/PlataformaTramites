import React, { useState } from 'react';

export default function HistorialFolios() {
  const [descargandoId, setDescargandoId] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // Datos simulados provenientes del GET /api/tramites/historial
  const folios = [
    { id: '1', folio: 'TR-00124', nombre: 'Juan Pérez' },
    { id: '2', folio: 'TR-04932', nombre: 'Fernando U.' }
  ];

  const simularDescarga = (id: string) => {
    setDescargandoId(id);
    setMensajeExito(null);

    // Simulación de 2 segundos de tiempo de descarga
    setTimeout(() => {
      setDescargandoId(null);
      setMensajeExito(`¡Descarga del reporte finalizada exitosamente!`);
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMensajeExito(null), 3000);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto mt-10 bg-white border-2 border-gray-800 rounded-none shadow-md">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-200 pb-2">Historial de Trámites</h2>
      
      {mensajeExito && (
        <div className="mb-4 p-3 bg-[#6EE600] text-gray-900 font-bold border-2 border-gray-900">
          {mensajeExito}
        </div>
      )}

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-800">
            <th className="p-3">Folio</th>
            <th className="p-3">Nombre</th>
            <th className="p-3 text-right">Acción</th>
          </tr>
        </thead>
        <tbody>
          {folios.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="p-3 font-semibold text-gray-700">{item.folio}</td>
              <td className="p-3">{item.nombre}</td>
              <td className="p-3 text-right">
                <button 
                  onClick={() => simularDescarga(item.id)}
                  disabled={descargandoId === item.id}
                  className="bg-gray-200 text-gray-900 font-bold py-1 px-4 border-2 border-gray-900 hover:bg-[#6EE600] transition-colors disabled:opacity-50"
                >
                  {descargandoId === item.id ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Descargando...
                    </span>
                  ) : (
                    'Descargar Reporte'
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}