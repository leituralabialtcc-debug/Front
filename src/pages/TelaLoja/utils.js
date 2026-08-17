// src/.../utils.js
export function filtrarItensPorBusca(itens, termo) {
  if (!termo) return itens;
  const termoNormalizado = termo.trim().toLowerCase();
  return itens.filter((item) =>
    item.title.toLowerCase().includes(termoNormalizado)
  );
}