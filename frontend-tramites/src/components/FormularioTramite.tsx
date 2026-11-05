import { useState, type FormEvent, type ChangeEvent } from 'react';

export default function FormularioTramite() {
  const [archivoPdf, setArchivoPdf] = useState<File | null>(null);
  const [archivoTxt, setArchivoTxt] = useState<File | null>(null);
  const [curp, setCurp] = useState('');
  const [curpValida, setCurpValida] = useState<boolean | null>(null);
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [cargando, setCargando] = useState(false);
  const [folioGenerado, setFolioGenerado] = useState<string | null>(null);

  const estadosMexico = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
    "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México",
    "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit",
    "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí",
    "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
  ];

  const manejarCurp = (e: ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.toUpperCase();
    setCurp(valor);
    if (valor.length === 0) {
      setCurpValida(null);
    } else {
      const regexCurp = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
      setCurpValida(regexCurp.test(valor));
    }
  };

  // Aplica el formato dd/mm/aaaa mientras se escribe
  const manejarFecha = (e: ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value.replace(/\D/g, '').slice(0, 8);
    let formateada = d;
    if (d.length > 4) formateada = `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
    else if (d.length > 2) formateada = `${d.slice(0, 2)}/${d.slice(2)}`;
    setFechaNacimiento(formateada);
  };

  // Solo dígitos, máximo 10
  const manejarTelefono = (e: ChangeEvent<HTMLInputElement>) => {
    setTelefono(e.target.value.replace(/\D/g, '').slice(0, 10));
  };

  // Solo dígitos, máximo 5
  const manejarCodigoPostal = (e: ChangeEvent<HTMLInputElement>) => {
    setCodigoPostal(e.target.value.replace(/\D/g, '').slice(0, 5));
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('http://localhost:5058/api/tramites', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setFolioGenerado(data.folio);
      } else {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        alert("Hubo un error al procesar el trámite en el servidor. Revisa la consola.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor .NET. ¿Está encendido el backend?");
    } finally {
      setCargando(false);
    }
  };

  const CheckIcon = () => (
    <svg className="w-5 h-5 text-[#6EE600] inline-block stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  const inputClass = "w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#6EE600] outline-none text-sm";
  const selectClass = `${inputClass} bg-white`;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* BLOQUE 1: IDENTIFICACIÓN */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-50 p-3 rounded-xl text-[#6EE600]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Datos Personales</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre(s)</label>
              <input type="text" name="nombres" className={inputClass} placeholder="Ej. Luis Gustavo" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
              <input type="text" name="apellidos" className={inputClass} placeholder="Ej. Camacho Ramirez" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
              <input
                type="text"
                name="fechaNacimiento"
                inputMode="numeric"
                maxLength={10}
                value={fechaNacimiento}
                onChange={manejarFecha}
                pattern="(0[1-9]|[12]\d|3[01])/(0[1-9]|1[0-2])/\d{4}"
                title="Formato dd/mm/aaaa"
                className={inputClass}
                placeholder="dd/mm/aaaa"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
              <select name="sexo" className={selectClass} required defaultValue="">
                <option value="" disabled>Seleccionar...</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Prefiero no decir">Prefiero no decir</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-sm font-medium text-gray-700">CURP</label>
              </div>
              <input type="text" name="curp" maxLength={18} value={curp} onChange={manejarCurp} className={`w-full border rounded-lg p-2.5 outline-none text-sm uppercase ${curpValida === false ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#6EE600]'}`} placeholder="18 digitos" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado Civil</label>
              <select name="estadoCivil" className={selectClass} required defaultValue="">
                <option value="" disabled>Seleccionar...</option>
                <option value="Soltero(a)">Soltero(a)</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="Unión libre">Unión libre</option>
                <option value="Divorciado(a)">Divorciado(a)</option>
                <option value="Viudo(a)">Viudo(a)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                inputMode="numeric"
                maxLength={10}
                value={telefono}
                onChange={manejarTelefono}
                pattern="\d{10}"
                title="Ingresa 10 dígitos"
                className={inputClass}
                placeholder="55-55555555"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input type="email" name="correo" className={inputClass} placeholder="ejemplo@correo.com" required />
            </div>
          </div>
        </div>

        {/* BLOQUE 2: DATOS ECONÓMICOS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-50 p-3 rounded-xl text-[#6EE600]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Datos Económicos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Situación Laboral</label>
              <select name="situacionLaboral" className={selectClass} required defaultValue="">
                <option value="" disabled>Seleccionar...</option>
                <option value="Empleado">Empleado</option>
                <option value="Independiente">Independiente</option>
                <option value="Desempleado">Desempleado</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Jubilado">Jubilado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ocupación</label>
              <input type="text" name="ocupacion" className={inputClass} placeholder="Ej. Desarrollador de Software, Contador" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Empresa / Institución</label>
              <input type="text" name="empresa" className={inputClass} placeholder="Ej. Banco Nacional, UNAM" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dependientes Económicos</label>
              <input type="number" name="dependientesEconomicos" min={0} step={1} inputMode="numeric" className={inputClass} placeholder="0" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ingreso Mensual</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">$</span>
                <input type="number" name="ingresoMensual" min={0} step="0.01" className="w-full border border-gray-300 rounded-lg py-2.5 pl-7 pr-12 focus:ring-2 focus:ring-[#6EE600] outline-none text-sm" placeholder="0.00" required />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-xs">MXN</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Egreso Mensual</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">$</span>
                <input type="number" name="egresoMensual" min={0} step="0.01" className="w-full border border-gray-300 rounded-lg py-2.5 pl-7 pr-12 focus:ring-2 focus:ring-[#6EE600] outline-none text-sm" placeholder="0.00" required />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-xs">MXN</span>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 3: DATOS GEOGRÁFICOS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-50 p-3 rounded-xl text-[#6EE600]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Datos de Domicilio</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
              <input type="text" name="codigoPostal" inputMode="numeric" maxLength={5} value={codigoPostal} onChange={manejarCodigoPostal} pattern="\d{5}" title="Ingresa 5 dígitos" className={inputClass} placeholder="Ej. 08400" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select name="estado" className={selectClass} required defaultValue="">
                <option value="" disabled>Seleccionar...</option>
                {estadosMexico.map(est => <option key={est} value={est}>{est}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Municipio / Alcaldía</label>
              <input type="text" name="municipio" className={inputClass} placeholder="Ej. Iztacalco" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colonia</label>
              <input type="text" name="colonia" className={inputClass} placeholder="Ej. Granajas México" required />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Calle</label>
                <input type="text" name="calle" className={inputClass} placeholder="Ej. Av. Té" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Núm. Exterior</label>
                <input type="text" name="numeroExterior" className={inputClass} placeholder="Ej. 123" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Núm. Interior</label>
                <input type="text" name="numeroInterior" className={inputClass} placeholder="Ej. 4B" />
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 4: DOCUMENTOS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-50 p-3 rounded-xl text-[#6EE600]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Carga de Documentos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input PDF */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">1. Documento .pdf <span className="text-red-500">*</span></label>

              </div>
              <div className="relative">
                <label className="flex items-center w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 cursor-pointer hover:border-[#6EE600] transition-colors">
                  <span className="text-sm text-gray-500 flex-1 truncate">{archivoPdf ? archivoPdf.name : 'Seleccionar archivo...'}</span>
                  <input type="file" name="archivoPdf" accept=".pdf" className="hidden" onChange={(e) => setArchivoPdf(e.target.files?.[0] || null)} required />
                  {archivoPdf && <span className="ml-2"><CheckIcon /></span>}
                </label>
              </div>
            </div>

            {/* Input TXT */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">2. Documento .txt <span className="text-red-500">*</span></label>
              </div>
              <div className="relative">
                <label className="flex items-center w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 cursor-pointer hover:border-[#6EE600] transition-colors">
                  <span className="text-sm text-gray-500 flex-1 truncate">{archivoTxt ? archivoTxt.name : 'Seleccionar archivo...'}</span>
                  <input type="file" name="archivoTxt" accept=".txt" className="hidden" onChange={(e) => setArchivoTxt(e.target.files?.[0] || null)} required />
                  {archivoTxt && <span className="ml-2"><CheckIcon /></span>}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* BOTÓN DE ENVÍO */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={cargando} 
            className="bg-[#2D3748] hover:bg-[#6EE600] text-white hover:text-gray-900 font-bold py-3 px-8 rounded-full transition-all shadow-md disabled:opacity-50"
          >
            {cargando ? 'Procesando...' : 'Finalizar Trámite'}
          </button>
        </div>
      </form>

      {/* Modal de confirmación */}
      {folioGenerado && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 text-[#6EE600] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">¡Registro Exitoso!</h3>
            <p className="text-gray-500 mb-6">Tu número de folio asignado es:</p>
            <p className="text-3xl font-bold text-[#6EE600] mb-8 bg-gray-50 py-4 rounded-xl border border-gray-100">
              {folioGenerado}
            </p>
            <button 
              onClick={() => { setFolioGenerado(null); window.location.reload(); }} 
              className="w-full bg-[#2D3748] text-white font-bold py-3 px-4 rounded-full hover:bg-[#6EE600] hover:text-gray-900 transition-colors"
            >
              Cerrar y Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}