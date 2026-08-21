import api from "./api";

export async function buscarOfensiva() {
  try {
    const response = await api.get("/Usuario/ofensiva");
    return { sucesso: true, data: response.data };
  } catch (error) {
    const mensagem =
      error.response?.data?.message || "Erro ao buscar ofensiva.";
    return { sucesso: false, mensagem };
  }
}