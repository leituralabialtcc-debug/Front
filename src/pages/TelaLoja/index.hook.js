import { useState, useEffect, useMemo } from "react";
import { produtoService } from "../../services/produtoService";
import { filtrarItensPorBusca } from "./utils";

// Função auxiliar para mapear o Enum do C# para as categorias visuais do Front
const mapearTipoParaIcone = (tipoEnum) => {
  // Ajuste os números de acordo com a numeração do seu Enum TipoProduto no C#
  switch (tipoEnum) {
    case 1: return "gelo";   // Ex: BloqueioOfensiva
    case 2: return "moedas"; // Ex: MultiplicadorMoedas
    default: return "bau";   // Ex: Cosmetico
  }
};

export function useTelaLoja() {
  const [busca, setBusca] = useState("");
  const [drawerAberto, setDrawerAberto] = useState(false);
  
  // Estados para a API
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // 1º: A função precisa ser declarada ANTES do useEffect
  const carregarProdutosDaApi = async () => {
    try {
      setCarregando(true);
      const data = await produtoService.listarProdutos();
      
      // Formatando os dados da API para o formato que a tela espera
      const produtosFormatados = data.map((p) => ({
        id: p.idProduto,
        title: p.nome,
        description: p.duracaoDias ? `Duração de ${p.duracaoDias} dias` : 'Item cosmético',
        price: p.preco,
        tipo: mapearTipoParaIcone(p.tipo),
        isBlocked: false, 
      }));

      setProdutos(produtosFormatados);
    } catch (error) {
      console.error("Erro ao buscar produtos da loja:", error);
    } finally {
      setCarregando(false);
    }
  };

  // 2º: Agora o useEffect consegue encontrar a função
  useEffect(() => {
    carregarProdutosDaApi();
  }, []);

  // Filtro memoizado por termo de pesquisa
  const itensFiltrados = useMemo(
    () => filtrarItensPorBusca(produtos, busca),
    [busca, produtos]
  );

  const abrirPerfil = () => setDrawerAberto(true);
  const fecharPerfil = () => setDrawerAberto(false);

  const handleComprar = async (item) => {
    if (item.isBlocked) {
      alert(`O item "${item.title}" está bloqueado.`);
      return;
    }

    try {
      // Ajuste para pegar o ID correto dependendo de como você gerencia o login
      const usuarioLogadoId = localStorage.getItem("usuarioId") || 1; 

      const resposta = await produtoService.comprarProduto(usuarioLogadoId, item.id, 1);
      
      alert(resposta.message || "Compra realizada com sucesso!");
      console.log("Saldo atualizado:", resposta.novoSaldo);
      
    } catch (error) {
      console.error("Erro na compra:", error);
      const mensagemErro = error.response?.data?.message || "Erro ao realizar compra.";
      alert(mensagemErro);
    }
  };

  return {
    busca,
    setBusca,
    itensFiltrados,
    drawerAberto,
    abrirPerfil,
    fecharPerfil,
    handleComprar,
    carregando,
  };
}