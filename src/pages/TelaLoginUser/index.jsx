import "./index.css";
import { useNavigate } from "react-router-dom";
import Botao from "../../components/Botao";

const TelaLoginUser = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>

      <div className="bg-triangle triangle-1"></div>
      <div className="bg-triangle triangle-2"></div>
      <div className="bg-triangle triangle-3"></div>

      <div className="login-container">
        {/* LADO ESQUERDO */}
        <div className="login-left">
          <h1>Entrar sua conta!</h1>

          <p className="subtitle">Preencha seus dados para entrar</p>

          {/* Correção: Envolvemos os inputs e o botão em um <form> */}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              {/* Dica: coloquei 'required' para obrigar o preenchimento */}
              <input type="email" placeholder="Email" required />
            </div>

            <div className="input-group">
              <input type="password" placeholder="Senha" required />
            </div>

            <div className="btn-container">
              {/* Adicionado o onClick chamando a função */}
              <Botao 
                texto="Entrar" 
                corDeFundo="#8426ac" 
                corBorda="" 
                onClick={handleLogin} 
              />
            </div>
          </form>

          <div className="google-login">
            <span>Entre com google:</span>

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
            />
          </div>
        </div>

        {/* LADO DIREITO */}
        <div className="login-right">
          <div className="welcome-content">
            <h2>Olá de novo!</h2>

            <p>
              Não possui uma conta?
              <br />
              Por favor, preencha suas informações aqui
            </p>

            {/* O botão de cadastro já estava com o onClick certinho! */}
            <Botao 
              texto="Cadastro" 
              corDeFundo="transparent" 
              corBorda="white" 
              onClick={() => navigate("/criar-conta")} 
            />

            <div className="triangle-top"></div>
            <div className="triangle-middle"></div>
            <div className="triangle-small-bottom"></div>
            <div className="triangle-large-left"></div>
            <div className="triangle-top-left"></div>
          </div>

          <div className="shape triangle-top"></div>
          <div className="shape triangle-middle"></div>
        </div>
      </div>
    </div>
  );
};

export default TelaLoginUser;