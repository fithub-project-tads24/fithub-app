import React from 'react';

const MobileLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-900 flex justify-center items-center p-4">

      {/* Moldura do Celular */}
      <div className="w-full max-w-[400px] h-[850px] bg-black rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-neutral-800 relative flex flex-col">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-xl z-50"></div>

        {/* Área de Conteúdo */}
        <div className="flex-1 overflow-y-auto bg-black scrollbar-hide text-white relative">
          {children}
        </div>

        {/* Barra de Navegação Inferior*/}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-700 rounded-full z-50"></div>
      </div>
    </div>
  );
};

export default MobileLayout;
