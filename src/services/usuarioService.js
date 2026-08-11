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

export async function buscarUsuarioLogado() {
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  if (!id || role !== "Usuario") {
    return { sucesso: false, mensagem: "Usuário não autenticado." };
  }

  try {
    const response = await api.get(`/Usuario/${id}`);
    return { sucesso: true, data: response.data };
  } catch (error) {
    const mensagem =
      error.response?.data?.message || "Erro ao buscar dados do usuário.";
    return { sucesso: false, mensagem };
  }
}