import api from './api';

export async function login(email, password) {
  try {
    const response = await api.post('/Auth/login', {
      Email: email,
      Senha: password,
    });
    const { token, role, id, nome, email: userEmail } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', userEmail);

    return { success: true, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || 'Erro ao fazer login.';
    return { success: false, message };
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('id');
  localStorage.removeItem('nome');
  localStorage.removeItem('email');
}
