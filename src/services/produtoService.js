
import api from './api'; 

export const produtoService = {
  listarProdutos: async () => {
    const response = await api.get('/Produto');
    return response.data;
  },
  
  comprarProduto: async (usuarioId, produtoId, quantidade = 1) => {
    const payload = {
      usuarioId: usuarioId,
      produtoId: produtoId,
      quantidade: quantidade
    };
    const response = await api.post('/Produto/comprar', payload);
    return response.data;
  }
};