import { useState } from "react";

export function useTelaDicionario() {
  const [drawerAberto, setDrawerAberto] = useState(false);

  const abrirPerfil = () => setDrawerAberto(true);
  const fecharPerfil = () => setDrawerAberto(false);

  return {
    drawerAberto,
    abrirPerfil,
    fecharPerfil,
  };
}