import api from './api';

export async function listarConquistas() {
  try {
    const response = await api.get('/Conquista');
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao buscar conquistas.';
    return { success: false, message };
  }
}

export async function buscarConquistaPorId(id) {
  try {
    const response = await api.get(`/Conquista/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao buscar conquista.';
    return { success: false, message };
  }
}

export async function cadastrarConquista(dados) {
  try {
    const response = await api.post('/Conquista', dados);
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao cadastrar conquista.';
    return { success: false, message };
  }
}

export async function editarConquista(id, dados) {
  try {
    const response = await api.put(`/Conquista/${id}`, dados);
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao editar conquista.';
    return { success: false, message };
  }
}

export async function deletarConquista(id) {
  try {
    const response = await api.delete(`/Conquista/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao deletar conquista.';
    return { success: false, message };
  }
}

export async function concederConquista(dados) {
  try {
    const response = await api.post('/Conquista/conceder', dados);
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao conceder conquista.';
    return { success: false, message };
  }
}

export async function listarConquistasUsuario(usuarioId) {
  try {
    const response = await api.get(`/Conquista/usuario/${usuarioId}`);
    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao buscar conquistas do usuário.';
    return { success: false, message };
  }
}
