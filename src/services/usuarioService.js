import api from "./api";

export async function cadastrarUsuario(dados) {
  try {
    const response = await api.post("/Usuario", dados);
    return { sucesso: true, data: response.data };
  } catch (error) {
    const mensagem =
      error.response?.data?.message || "Erro ao cadastrar usuário.";
    return { sucesso: false, mensagem };
  }
}