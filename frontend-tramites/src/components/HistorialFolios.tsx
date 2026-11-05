import { useState, useEffect } from 'react';

interface Tramite {
  id: number;
  folio: string;
  nombre: string;
  curp: string;
  domicilio: string;
  tienePdf: boolean;
  tieneTxt: boolean;
}

export default function HistorialFolios() {
  const [folios, setFolios] = useState<Tramite[]>([]);
  const [descargandoId, setDescargandoId] = useState<number | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const response = await fetch('http://localhost:5058/api/tramites/historial');
        if (response.ok) {
          const data = await response.json();
          setFolios(data);
        }
      } catch (error) {
        console.error("Error al cargar el historial:", error);
      }
    };

    cargarHistorial();
  }, []);

  const simularDescarga = (id: number) => {
    if (descargandoId !== null) return; 

    setDescargandoId(id);
    setMensajeExito(null);

    setTimeout(() => {
      setDescargandoId(null);
      setMensajeExito('¡Descarga del reporte finalizada exitosamente!');
      
      setTimeout(() => setMensajeExito(null), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-8">
        
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="bg-green-50 p-3 rounded-xl text-[#6EE600] shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Historial de Trámites</h2>
        </div>

        {mensajeExito && (
          <div className="mb-6 p-4 bg-green-50 text-[#4a9e00] text-sm font-medium rounded-xl border border-green-100 flex items-center gap-3 animate-fade-in">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{mensajeExito}</span>
          </div>
        )}

        {/* VISTA MÓVIL: Tarjetas Apiladas (< 768px) */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {folios.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-10 border border-dashed rounded-xl">
              No hay trámites registrados aún.
            </div>
          ) : (
            folios.map((item) => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-bold text-gray-800 bg-gray-100 px-3 py-1.5 rounded-lg text-xs border border-gray-200 whitespace-nowrap">
                    {item.folio}
                  </span>
                  {/* Etiquetas de Documentos en Móvil con color neutro */}
                  <div className="flex gap-2">
                    {item.tienePdf && <span className="text-gray-600 text-[11px] font-bold">PDF</span>}
                    {item.tieneTxt && <span className="text-gray-600 text-[11px] font-bold">TXT</span>}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.nombre}</p>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">{item.curp}</p>
                  <p className="text-xs text-gray-600 mt-1.5 flex items-start gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {item.domicilio}
                  </p>
                </div>
                <button 
                  onClick={() => simularDescarga(item.id)}
                  disabled={descargandoId !== null} 
                  className="w-full min-h-[44px] mt-2 px-4 py-2.5 text-sm font-semibold rounded-full border border-gray-200 text-gray-600 bg-white hover:bg-[#6EE600] hover:text-gray-900 hover:border-[#6EE600] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#6EE600] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {descargandoId === item.id ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Descargar Reporte</span>
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* VISTA ESCRITORIO: Tabla Minimalista (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-4 text-sm font-semibold text-gray-500 tracking-wide">Folio</th>
                <th className="pb-4 text-sm font-semibold text-gray-500 tracking-wide">Solicitante</th>
                <th className="pb-4 text-sm font-semibold text-gray-500 tracking-wide">CURP</th>
                <th className="pb-4 text-sm font-semibold text-gray-500 tracking-wide">Domicilio</th>
                <th className="pb-4 text-sm font-semibold text-gray-500 tracking-wide">Documentos</th>
                <th className="pb-4 text-sm font-semibold text-gray-500 tracking-wide text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {folios.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500 text-sm">
                    No hay trámites registrados aún.
                  </td>
                </tr>
              ) : (
                folios.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 pr-2">
                      <span className="font-bold text-gray-800 bg-gray-100 px-3 py-1.5 rounded-lg text-sm border border-gray-200 whitespace-nowrap">
                        {item.folio}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-sm text-gray-600 font-medium whitespace-nowrap">{item.nombre}</td>
                    <td className="py-4 px-2 text-sm text-gray-500 font-mono whitespace-nowrap">{item.curp}</td>
                    <td className="py-4 px-2 text-sm text-gray-600 max-w-[200px] truncate" title={item.domicilio}>{item.domicilio}</td>
                    {/* Etiquetas de Documentos en Escritorio con color neutro */}
                    <td className="py-4 px-2">
                      <div className="flex gap-2">
                        {item.tienePdf && <span className="text-gray-600 text-xs font-bold">PDF</span>}
                        {item.tieneTxt && <span className="text-gray-600 text-xs font-bold">TXT</span>}
                      </div>
                    </td>
                    <td className="py-4 pl-2 text-center">
                      <button 
                        onClick={() => simularDescarga(item.id)}
                        disabled={descargandoId !== null} 
                        className="px-5 py-2.5 min-h-[44px] text-sm font-semibold rounded-full border border-gray-200 text-gray-600 bg-white hover:bg-[#6EE600] hover:text-gray-900 hover:border-[#6EE600] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#6EE600] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-md inline-flex items-center justify-center gap-2 whitespace-nowrap mx-auto"
                      >
                        {descargandoId === item.id ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Procesando...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Descargar Reporte</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}