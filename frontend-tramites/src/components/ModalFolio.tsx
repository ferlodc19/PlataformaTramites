export default function ModalFolio({ folio, onClose }: { folio: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 border-4 border-[#6EE600] rounded-none max-w-sm w-full text-center shadow-lg">
        <h3 className="text-xl font-bold mb-2">¡Registro Exitoso!</h3>
        <p className="mb-4">Tu folio de seguimiento es:</p>
        <div className="text-3xl font-extrabold text-gray-900 tracking-widest mb-6">
          {folio}
        </div>
        <button onClick={onClose} className="bg-gray-900 text-white font-bold py-2 px-6 rounded-none hover:bg-gray-800">
          Aceptar
        </button>
      </div>
    </div>
  );
}