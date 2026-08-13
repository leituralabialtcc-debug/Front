import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSidebar } from "../../components/UserSidebar";
import useLogout from "./index.hooks";
import './index.css';

const TelaPerfil = () => {
  const [secaoAtiva, setSecaoAtiva] = useState('perfil');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [diagnostico, setDiagnostico] = useState('');

  const [modoEscuro, setModoEscuro] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [confirmarSaidaAberto, setConfirmarSaidaAberto] = useState(false);

  const navigate = useNavigate();
  const { handleLogout } = useLogout();

  // refs das seções, pra poder scrollar até elas
  const perfilRef = useRef(null);
  const configuracoesRef = useRef(null);

  const handleSalvar = (e) => {
    e.preventDefault();
    console.log('Dados salvos:', { nome, email, senha, diagnostico });
  };

  const confirmarLogout = () => {
    setConfirmarSaidaAberto(false);
    handleLogout();
  };

  // faz o scroll suave até a seção clicada na sidebar
  const handleSectionChange = (secao) => {
    setSecaoAtiva(secao);
    const ref = secao === 'perfil' ? perfilRef : configuracoesRef;
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // observa qual seção está visível pra manter a sidebar sincronizada com o scroll manual
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSecaoAtiva(entry.target.dataset.secao);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (perfilRef.current) observer.observe(perfilRef.current);
    if (configuracoesRef.current) observer.observe(configuracoesRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="perfil-page-container">
      <div className="bg-waves">
        <svg viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M1440 0H900C1100 200 1050 500 1250 750C1350 870 1390 960 1440 1024V0Z" fill="#ecdcf7" opacity="0.6"/>
          <path d="M1440 250C1200 450 1280 700 1100 850C1000 930 920 970 850 1024H1440V250Z" fill="#f0e4fa" opacity="0.5"/>
          <path d="M1440 600C1350 720 1380 850 1200 950C1120 990 1050 1010 1000 1024H1440V600Z" fill="#e6d2f5" opacity="0.4"/>
        </svg>
      </div>

      <UserSidebar
        activeSection={secaoAtiva}
        onSectionChange={handleSectionChange}
        onBackClick={() => navigate(-1)}
      />

      <main className="perfil-main-content">

        {/* ---- SEÇÃO PERFIL ---- */}
        <section ref={perfilRef} data-secao="perfil" className="perfil-section">
          <div className="perfil-header">
            <h1 className="perfil-title">Seu Perfil</h1>

            <div className="progress-container">
              <button className="btn-voltar" onClick={() => navigate(-1)}></button>
              <svg className="progress-svg" viewBox="0 0 90 90">
                <circle className="progress-circle-bg" cx="45" cy="45" r="40" />
                <circle className="progress-circle-bar" cx="45" cy="45" r="40" />
              </svg>
              <div className="progress-text">
                <strong>75%</strong>
                <br />
                <span>Completo</span>
              </div>
            </div>
          </div>

          <form className="perfil-form" onSubmit={handleSalvar}>
            <div className="form-group">
              <label>Nome:</label>
              <span>Altere seu nome completo cadastrado na conta</span>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <span>Gerencie seu endereço de email principal de acesso</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Senha:</label>
              <span>Altere sua chave de segurança secreta</span>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Diagnóstico:</label>
              <span>Insira ou edite os dados do seu diagnóstico médico atual</span>
              <input type="text" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
            </div>

            <button type="submit" className="btn-confirmar">
              Confirmar
            </button>
          </form>
        </section>

        {/* ---- SEÇÃO CONFIGURAÇÕES ---- */}
        <section ref={configuracoesRef} data-secao="configuracoes" className="configuracoes-section">
          <div className="configuracoes-grid">
            <div className="config-card">
              <h3 className="config-card-title">Modo de Cor</h3>
              <p className="config-card-description">
                Ative o tema escuro para reduzir o cansaço visual em ambientes de
                baixa luminosidade.
              </p>
              <div className="config-card-action">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={modoEscuro}
                    onChange={(e) => setModoEscuro(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="config-card">
              <h3 className="config-card-title">Notificações</h3>
              <p className="config-card-description">
                Receba alertas e atualizações importantes sobre o seu perfil
                diretamente no sistema.
              </p>
              <div className="config-card-action">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notificacoes}
                    onChange={(e) => setNotificacoes(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="logout-section-wrapper">
            <div className="config-card-wide config-card-logout">
              <div className="wide-info">
                <h3 className="config-card-title">Sair da conta</h3>
                <p className="config-card-description">
                  Encerre sua sessão atual neste dispositivo. Você precisará fazer
                  login novamente para acessar sua conta.
                </p>
              </div>

              <div className="wide-actions">
                <button
                  className="logout-button"
                  onClick={() => setConfirmarSaidaAberto(true)}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {confirmarSaidaAberto && (
        <div
          className="logout-modal-overlay"
          role="presentation"
          onClick={() => setConfirmarSaidaAberto(false)}
        >
          <div
            className="logout-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
            aria-describedby="logout-modal-desc"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="logout-modal-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 id="logout-modal-title" className="logout-modal-title">
              Deseja realmente sair?
            </h2>
            <p id="logout-modal-desc" className="logout-modal-desc">
              Você será desconectado da sua conta neste dispositivo e precisará
              fazer login novamente para continuar.
            </p>
            <div className="logout-modal-actions">
              <button className="logout-modal-cancel" onClick={() => setConfirmarSaidaAberto(false)}>
                Cancelar
              </button>
              <button className="logout-modal-confirm" onClick={confirmarLogout}>
                Sim, sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelaPerfil;