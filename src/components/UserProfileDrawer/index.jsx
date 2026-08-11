import React from 'react';
import { X, Bell, User } from 'lucide-react';
import { useUserProfileDrawer } from './index.hook';
import { formatPhone } from './utils';
import './index.css';

export const UserProfileDrawer = ({ isOpen, onClose }) => {
  const { usuario, carregando, handleEditProfileClick, handleNotificacao } = useUserProfileDrawer(onClose, isOpen);

  const data = {
    username: usuario?.nome || usuario?.Nome || 'Usuário',
    email: usuario?.email || usuario?.Email || '',
    diagnostic: usuario?.diagnostico || usuario?.Diagnostico || 'Não informado',
    fullName: usuario?.nome || usuario?.Nome || 'Usuário',
    birthDate: '—', // não existe no backend ainda
    phone: '' // não existe no backend ainda
  };

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}
      
      <div className={`drawer-container ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <button className="close-btn" onClick={onClose}>
            <X size={24} color="#8A6B8E" />
          </button>
          
          <button className="drawer-notification-btn" onClick={handleNotificacao}>
            <Bell size={20} color="white" fill="white"  />
          </button>
        </div>

        <div className="drawer-profile-info">
          <div className="avatar-circle">
            <User size={48} color="white" />
          </div>
          <h2 className="username">{carregando ? 'Carregando...' : data.username}</h2>
          <span className="user-email">{data.email}</span>
        </div>

        <div className="drawer-details">
          <p><strong>Diagnóstico:</strong> {data.diagnostic}</p>
          <p><strong>Nome:</strong> {data.fullName}</p>
          {data.phone && <p><strong>Telefone:</strong> {formatPhone(data.phone)}</p>}
        </div>

        <button className="edit-profile-btn" onClick={handleEditProfileClick}>
          Editar Perfil
        </button>
      </div>
    </>
  );
};