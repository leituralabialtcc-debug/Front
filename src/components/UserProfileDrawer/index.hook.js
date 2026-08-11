import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarUsuarioLogado } from '../../services/usuarioService';

export const useUserProfileDrawer = (onClose, isOpen) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    async function carregarUsuario() {
      setCarregando(true);
      const resultado = await buscarUsuarioLogado();
      if (resultado.sucesso) {
        setUsuario(resultado.data);
      }
      setCarregando(false);
    }

    carregarUsuario();
  }, [isOpen]);

  const handleEditProfileClick = () => {
    onClose();
    navigate('/perfil');
  };

  const handleNotificacao = () => {
    onClose();
    navigate('/notificacoes');
  };

  return {
    usuario,
    carregando,
    handleEditProfileClick,
    handleNotificacao,
  };
};